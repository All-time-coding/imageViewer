package com.imageviewer

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.imageviewer.LoupeImageViewer.ImageViewManager

class ImageViewModulePackage : ReactPackage {

    companion object {
        lateinit var context: ReactApplicationContext
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(ImageViewManager(reactContext))
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        context = reactContext
        return listOf(ImageViewModule(reactContext))
    }
}
