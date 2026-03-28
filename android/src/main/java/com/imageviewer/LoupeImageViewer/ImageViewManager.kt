package com.imageviewer.LoupeImageViewer
import android.view.View
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext

class ImageViewManager(private val context: ReactApplicationContext): SimpleViewManager<View>() {
    override fun getName() = "GalleryView"

    override fun getNativeProps(): Map<String?, String?>? {
        return super.getNativeProps()
    }

    override fun createViewInstance(p0: ThemedReactContext): View {
        TODO("Not yet implemented")
    }

    override fun getExportedCustomBubblingEventTypeConstants(): Map<String?, Any?>? {
        return super.getExportedCustomBubblingEventTypeConstants()
    }
}
