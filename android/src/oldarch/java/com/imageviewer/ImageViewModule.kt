package com.imageviewer

import android.os.Bundle
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.androidimageview.ImageViewActivity
import com.facebook.react.bridge.ReadableMap

class ImageViewModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val NAME = "ImageViewer"
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

    @ReactMethod
    fun open(urls: ReadableArray, index: Int,headers: ReadableMap?) {
        val urlList = ArrayList<String>()
        for (i in 0 until urls.size()) {
            urlList.add(urls.getString(i) ?: continue)
        }
      val _headers = readableMapToBundle(headers)
        val intent = ImageViewActivity.createIntent(reactApplicationContext, urlList, index,_headers )
        reactApplicationContext.startActivity(intent)
    }
}
