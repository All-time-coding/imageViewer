package com.imageviewer.LoupeImageViewer

import android.view.View
import com.imageviewer.LoupeImageViewer.Constants.EmitterEvent
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.imageviewer.ImageViewModulePackage


object  Emitter {
   private fun  eventEmitter () : DeviceEventManagerModule.RCTDeviceEventEmitter{
        return ImageViewModulePackage.context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
    }
    fun  onOpen() {
        val writableMap: WritableMap = Arguments.createMap()
        val emit = EmitterEvent.ON_OPEN.emit
        eventEmitter().emit(emit,writableMap)

    }

    fun onChangeIndex(index: Int){
        val writableMap: WritableMap = Arguments.createMap()
        writableMap.putInt("index",index)
        val emit = EmitterEvent.ON_CHANGE_INDEX .emit
        eventEmitter().emit(emit,writableMap)
    }

    fun onClose(){
        val writableMap: WritableMap = Arguments.createMap()
        val emit = EmitterEvent.ON_CLOSE.emit
        eventEmitter().emit(emit,writableMap)
    }

}
