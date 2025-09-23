package com.imageviewer.LoupeImageViewer

import android.app.Activity
import android.content.Intent
import android.util.Log
import com.androidimageview.ImageViewActivity
import com.facebook.react.ReactActivity
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableType
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.annotations.ReactProp
import java.util.ArrayList

@ReactModule(name = ImageViewModule.NAME)
class ImageViewModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext)
     {
    companion object {
        const val NAME = "ImageViewer"
    }

    private lateinit var onChangeIndexCallback: Callback
    private lateinit var onOpenCallback: Callback
    private lateinit var onCloseCallback: Callback

    override fun getName() = NAME


    @ReactMethod
    fun open(urls: ReadableArray, index: Int) {
        val context = reactApplicationContext
        val urlList = ArrayList<String>()
        for (i in 0 until urls.size()) {
            if (urls.getType(i) == ReadableType.String) {
                urlList.add(urls.getString(i))
            }
        }
        val intent = ImageViewActivity.createIntent(reactApplicationContext, urlList,index)

        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)

        if (context != null) {
            context.startActivity(intent)
        }

    }
    }

