package com.androidimageview

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.animation.AccelerateDecelerateInterpolator
import android.widget.ImageView
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.viewpager.widget.PagerAdapter
import coil3.load
import com.imageviewer.databinding.ImageActivityBinding
import com.imageviewer.databinding.ItemImageBinding
import com.imageviewer.Loupe.Loupe
import com.imageviewer.Loupe.createLoupe
import com.imageviewer.Loupe.setOnViewTranslateListener
import com.imageviewer.LoupeImageViewer.Emitter
import com.imageviewer.R
import java.io.Serializable


object Pref {
    var useSharedElements = true
    var maxZoom = Loupe.DEFAULT_MAX_ZOOM
    var flingAnimationDuration = Loupe.DEFAULT_ANIM_DURATION
    var scaleAnimationDuration = Loupe.DEFAULT_ANIM_DURATION_LONG
    var overScaleAnimationDuration = Loupe.DEFAULT_ANIM_DURATION_LONG
    var overScrollAnimationDuration = Loupe.DEFAULT_ANIM_DURATION
    var dismissAnimationDuration = Loupe.DEFAULT_ANIM_DURATION
    var restoreAnimationDuration = Loupe.DEFAULT_ANIM_DURATION
    var viewDragFriction = Loupe.DEFAULT_VIEW_DRAG_FRICTION
}
class ImageViewActivity : AppCompatActivity() {
    companion object {
        private const val ARG_URLS = "ARG_URLS"
        private const val ARG_CURRENT_INDEX = "ARG_CURRENT_INDEX"
        private const val  OPTIONS = "OPTIONS"
        fun createIntent(context: Context, urls: ArrayList<String>, index: Int): Intent {
            return Intent(context, ImageViewActivity::class.java).apply {
                putStringArrayListExtra(ARG_URLS, urls)
                putExtra(ARG_CURRENT_INDEX, index)
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
        }
    }

    private lateinit var binding: ImageActivityBinding

    private  val urls: ArrayList<String> by lazy { intent.getStringArrayListExtra(ARG_URLS)  as ArrayList<String>}
    private  val currentIndex:Int by lazy { intent.getIntExtra(ARG_CURRENT_INDEX,0) }
    private  var adapter: ImageAdapter? = null


    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.image_activity)
        initViewPager()


//        setResult()
        initToolBar()

        Emitter.onOpen()


    }

    fun initViewPager (){
        adapter = ImageAdapter(context = this,urls)
        binding.viewpager.adapter = adapter
        binding.viewpager.currentItem = currentIndex
    }

    private fun showToolbar() {
        binding.toolbar.animate()
            .setInterpolator(AccelerateDecelerateInterpolator())
            .translationY(0f)
    }
    private  fun hideToolBar(){
        binding.toolbar.animate().setInterpolator(AccelerateDecelerateInterpolator()).translationY(-binding.toolbar.height.toFloat())
    }

    fun initToolBar (){
        setSupportActionBar(binding.toolbar)
        supportActionBar?.apply {
            setDisplayShowHomeEnabled(true)
            setDisplayHomeAsUpEnabled(true)
            title=""
        }
    }
    override fun finish() {
        Emitter.onClose()
        super.finish()
        if(Build.VERSION.SDK_INT > Build.VERSION_CODES.UPSIDE_DOWN_CAKE){
            overrideActivityTransition(Activity.OVERRIDE_TRANSITION_CLOSE, R.anim.fade_in_fast, R.anim.fade_out_fast)
        }
         else {
            overridePendingTransition(0, R.anim.fade_out_fast)
         }
    }


    inner class ImageAdapter(var context: Context, var urls: ArrayList<String>) : PagerAdapter() {
        private var loupeMap = hashMapOf<Int, Loupe>()
        private var views = hashMapOf<Int, ImageView>()
        private var currentIndex = 0
        private var lastEmittedIndex = -1


        override fun instantiateItem(container: ViewGroup, position: Int): Any {

            val binding = ItemImageBinding.inflate(LayoutInflater.from(context))
            val url = urls[position]
            container.addView(binding.root)
            loadImage(image = binding.image,binding.container,url,position)
            views[position] = binding.image
            return  binding.root
        }
        override fun getCount() = urls.size

        override fun setPrimaryItem(container: ViewGroup, position: Int, obj: Any) {
            super.setPrimaryItem(container, position, obj)
            if (position != lastEmittedIndex) {
                lastEmittedIndex = position
                Emitter.onChangeIndex(position)
            }

            Log.d("POSITION",position.toString())
            this.currentIndex = position
        }
        override fun destroyItem(container: ViewGroup, position: Int, obj: Any) {
            container.removeView(obj as View)
        }


        override fun isViewFromObject(view: View, `object`: Any): Boolean {
            return  view == `object`
        }


        fun loadImage(image: ImageView, container: ViewGroup,url: String,position: Int){
            image.load(url){
                listener(
                    onSuccess = {
                        request, result ->
                        val loupe = createLoupe(image,container){
                            useFlingToDismissGesture = !Pref.useSharedElements
                            maxZoom = Pref.maxZoom
                            flingAnimationDuration = Pref.flingAnimationDuration
                            scaleAnimationDuration = Pref.scaleAnimationDuration
                            overScaleAnimationDuration = Pref.overScaleAnimationDuration
                            overScrollAnimationDuration = Pref.overScrollAnimationDuration
                            dismissAnimationDuration = Pref.dismissAnimationDuration
                            restoreAnimationDuration = Pref.restoreAnimationDuration
                            viewDragFriction = Pref.viewDragFriction
                         setOnViewTranslateListener (
                             onStart = { hideToolBar() },
                             onRestore ={showToolbar() },
                             onDismiss = { finish()}
                         )
                        }
                        loupeMap[position] = loupe
                        if (position == currentIndex) {
                            startPostponedEnterTransition()
                        }
                    }
                )
            }

        }

    }



}
