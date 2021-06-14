---
layout: post
title: Use animated image on your post
excerpt: Write an eye-catching article
categories: [misc, post]
share: false
image:
  feature: img/pixeltrue/minimalistic-illustrations/Blogging.json
  credit: pixeltrue minimalistic-illustrations
  creditlink: https://www.pixeltrue.com/free-packs/minimalistic-illustrations#preview
  type: json_adobe_after_effect
---

This article will help you to adding an animated image to your personal blog using JSON-exported Adobe After Effects (AAE) file

## Browse your favorite animated image

Visit [pixeltrue](https://www.pixeltrue.com/free-packs/), there're plenty of free material, not only just static images but also animations that you could download then apply to your post

In this article, I'm using the Blogging animation in [minimalistic-illustrations](https://www.pixeltrue.com/free-packs/minimalistic-illustrations#preview)

Select those with the badge `Animated` and download them, after unzip-ing, you should see a JSON file, it's animation file exported from Adobe After Effects under JSON format
![]()

## Add JS library for parsing JSON animation file

To be able to display the animation in your post, you would need a library that helps you to get the job done

[Lottie](https://github.com/airbnb/lottie-web) is a library that parses [Adobe After Effects](https://www.adobe.com/products/aftereffects.html) animations exported as JSON and renders them

Add the following to `<head>` tag of HTML file:
{% highlight html %}
<script
  src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.7.11/lottie.min.js"
  integrity="sha512-jbTBHn1aXqglu6As1bUWxdPYc9b1uMHtreBM30oW3HbNFDS/eO1n+f98l4qcmw2l7CAdjWSbu3wVjm9SKISOaw=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer">
</script>
{% endhighlight html %}

You could get the above content from [https://cdnjs.com/libraries/bodymovin](https://cdnjs.com/libraries/bodymovin)

To read and render the animation in your post
{% highlight js %}
lottie.loadAnimation({
  // the dom element that will contain the animation, e.g: document.getElementById('post')
  container: element,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'data.json' // the path to the animation json downloaded before
});
{% endhighlight %}

## Demo
<button onclick='showAnimation()'>Click here to display the animation</button>
<p id='demo-animation'>The animation will appear here...</p>
<script>
  function showAnimation() {
    lottie.loadAnimation({
      // the dom element that will contain the animation, e.g: document.getElementById('post')
      container: document.getElementById('demo-animation'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '{{ site.url }}/img/pixeltrue/minimalistic-illustrations/Blogging.json'
    });
  }
</script>
