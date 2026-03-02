package com.imageviewer

import android.os.Bundle
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.androidimageview.ImageViewActivity
import com.facebook.react.bridge.ReadableMap

class ImageViewModule(reactContext: ReactApplicationContext) :
    NativeImageViewerSpec(reactContext) {

    companion object {
        const val NAME = NativeImageViewerSpec.NAME
    }

    override fun getName() = NAME


  fun readableMapToBundle(readableMap: ReadableMap?): Bundle? {
    if (readableMap == null) return null
    val bundle = Bundle()
    val iterator = readableMap.keySetIterator()
    while (iterator.hasNextKey()) {
      val key = iterator.nextKey()
      bundle.putString(key, readableMap.getString(key))
    }
    return bundle
  }

    override fun open(urls: ReadableArray, index: Double,headers: ReadableMap? ) {
        val urlList = ArrayList<String>()
        for (i in 0 until urls.size()) {
            urlList.add(urls.getString(i)!!)
        }
      val _headers = readableMapToBundle(headers)
        val intent = ImageViewActivity.createIntent(reactApplicationContext, urlList, index.toInt(),_headers)
        reactApplicationContext.startActivity(intent)
    }
}
