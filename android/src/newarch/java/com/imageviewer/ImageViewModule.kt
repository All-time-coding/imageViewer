package com.imageviewer

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.androidimageview.ImageViewActivity

class ImageViewModule(reactContext: ReactApplicationContext) :
    NativeImageViewerSpec(reactContext) {

    companion object {
        const val NAME = NativeImageViewerSpec.NAME
    }

    override fun getName() = NAME

    override fun open(urls: ReadableArray, index: Double) {
        val urlList = ArrayList<String>()
        for (i in 0 until urls.size()) {
            urlList.add(urls.getString(i)!!)
        }
        val intent = ImageViewActivity.createIntent(reactApplicationContext, urlList, index.toInt())
        reactApplicationContext.startActivity(intent)
    }
}
