package com.imageviewer.oldArchitecture

import android.content.Intent
import com.androidimageview.ImageViewActivity
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
        val intent = ImageViewActivity.Companion.createIntent(reactApplicationContext, urlList,index)

        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)

        if (context != null) {
            context.startActivity(intent)
        }

    }
    }
