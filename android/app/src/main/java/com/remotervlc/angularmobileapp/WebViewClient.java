package com.remotervlc.angularmobileapp;

import android.graphics.Bitmap;
import android.net.Uri;
import android.view.View;
import android.webkit.HttpAuthHandler;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;

import com.getcapacitor.Bridge;

public class WebViewClient extends android.webkit.WebViewClient {

  private Bridge bridge;

  public WebViewClient(Bridge bridge) {
    this.bridge = bridge;
  }
  @Override
  public void onReceivedHttpAuthRequest(WebView view,
                                        HttpAuthHandler handler, String host, String realm) {

    handler.proceed("", "1z2x");
  }
  public WebResourceResponse shouldinterceptrequest(WebView view, WebResourceRequest request) {
    return bridge.getLocalServer().shouldInterceptRequest(request);
  }


  public boolean shouldOverrideurlloading(WebView view, WebResourceRequest request) {
    Uri url = request.getUrl();
    return bridge.launchIntent(url);
  }


  public boolean shouldOverrideurlloading(WebView view, String url) {
    return bridge.launchIntent(Uri.parse(url));
  }


  public void onpagefinished(WebView view, String url) {
    super.onPageFinished(view, url);
    // this setting is changing the zoom level
    view.loadUrl("javascript:document.body.style.zoom = "+ String.valueOf(getscale(view))+";");

  }

  private double getscale(View view) {
    return (view.getHeight() / (double) view.getWidth());
  }


  public void onpagestarted(WebView view, String url, Bitmap favicon) {
    super.onPageStarted(view, url, favicon);
    bridge.reset();
  }
}
