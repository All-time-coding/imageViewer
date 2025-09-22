package com.imageviewer.LoupeImageViewer

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class ImageViewModulePackage : ReactPackage {

    companion object  {
        lateinit  var context: ReactApplicationContext
    }
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>?> {
        return  mutableListOf()
    }
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule?> {
        context = reactContext
        return mutableListOf(ImageViewModule(reactContext));
    }
}