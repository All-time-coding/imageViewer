package com.imageviewer

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.androidimageview.ImageViewActivity

class ImageViewModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val NAME = "ImageViewer"
    }

    override fun getName() = NAME

    @ReactMethod
    fun open(urls: ReadableArray, index: Int) {
        val urlList = ArrayList<String>()
        for (i in 0 until urls.size()) {
            urlList.add(urls.getString(i) ?: continue)
        }
        val intent = ImageViewActivity.createIntent(reactApplicationContext, urlList, index)
        reactApplicationContext.startActivity(intent)
    }
}
