<!DOCTYPE html>
<html ng-app="viewheadExample">
<head>
<title ng-bind="viewTitle ? viewTitle + ' - viewhead example' : 'viewhead example'">viewhead example</title>
<script src="http://code.angularjs.org/1.2.4/angular.js"></script>
<script src="http://code.angularjs.org/1.2.4/angular-route.js"></script>
<script src="../angularjs-viewhead.js"></script>
<script src="example.js"></script>
<link rel="stylesheet" type="text/css" href="http://netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css">
</head>
<body>
<header class="navbar navbar-inverse">
  <div class="container">
    <div class="navbar-header">
      <a href="#/" class="navbar-brand">viewhead example</a>
    </div>
    <nav>
      <ul class="nav navbar-nav">
        <li><a href="#/dynamic-title">Dynamic Title</a></li>
        <li><a href="#/rss-link">RSS Linking</a></li>
      </ul>
    </nav>
  </div>
</header>

<div class="container" ng-view ng-cloak>

</div>


<script id="partials/dynamic-title.html" type="text/ng-template">
  <h1>Dynamic Title</h1>
  
  <p>The view title can include interpolated template expressions, just like any other element.
  The text field below is bound to the variable <code>chosenTitle</code> in the scope, and then
  the <code>view-title</code> directive also binds to that same variable, allowing the title
  to be set dynamically. Try changing the text below and watch as the document title changes.</p>
  
  <form class="form-inline">
    <div class="form-group">
      <input ng-model="chosenTitle" size="40">
    </div>
  </form>
  
  <view-title>{{chosenTitle}}</view-title>
</script>

<script id="partials/home.html" type="text/ng-template">
  <h1 view-title>About</h1>
  
  <p>This is a simple demonstration of the viewhead module for AngularJS. This module allows the view
  template to contribute a per-view part to the page title, and to configure other elements that should appear
  in the head of the document whenever the view is displayed.</p>
  
  <p>Navigate to the other pages in this demonstration to see the page title change. You can also use your
  browser's DOM inspector to watch the other head elements come and go.</p>
  
  <p>This page demonstrates how the view title can be automatically derived from an existing element in
  the document by simply adding the <code>view-title</code> attribute. The 'About' header above has this
  attribute, and so its content is automatically propagated to the page title.</p>
</script>

<script id="partials/rss-link.html" type="text/ng-template">
  <h1 view-title>RSS Linking</h1>
  
  <link view-head rel="alternate" type="application/rss+xml" href="{{ rssUrl }}">
  
  <p>Some browsers support subscribing to an RSS feed linked from the document's head. This is one example
  of an element you may wish to introduce into the head of the document on a per-view basis.</p>
  
  <p>If your browser supports RSS subscription you may see an RSS icon available for this page. If not, use
  your browser's DOM inspector to look at the head of the document and note the <code>link</code> element.
  This will go away when you navigate to one of the other pages in this demo, and come back when you return.</p>
  
  <p>Most consumers of RSS metadata are robots that can't run the JavaScript on an HTML page, so for best
  results this technique can be combined with a mechanism that creates static snapshots of pages to serve
  to robots. That's obviously out of scope for this module, but at the time of writing several services
  are available that provide such a snapshot feature.</p>
</script>

</body>
</html>
