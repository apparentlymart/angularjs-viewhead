angularjs-viewhead
==================

An AngularJS module to allow views to set the page title and insert extra elements into the head.

Motivation
----------

In normal use, AngularJS's router allows the selected view to affect a particular portion of the page,
marked by the ``ng-view`` directive. However, AngularJS provides no solution for having the view affect
data outside of the view element, with the most pertinent example being the global page title.

Many applications resort to tricks like having the controller for each view write extra data into the
root scope, which does indeed make that data available on a per-view basis, but it also violates the
separation of concerns between the controller and the template: the page title (and other ``head``
elements) are a presentational concern, so they rightfully belong in the template.

This module provides simple directives to allow this information to be provided via the view template
but to still appear in the ``head`` element in the final document.

Loading the Module
------------------

This module declares itself as ``viewhead``, so it can be declared as a dependency of your application as
normal:

```js
    var app = angular.module('myApp', ['ng', 'viewhead']);
```

This makes available the directives described in the following sections.

Setting a Per-view Page Title
-----------------------------

A common pattern in web application is to have the main page title (as displayed in the browser title bar
or tab caption) be a combination of the name of the site or application and the name of the current view.
For example, the about page of a site called FooBaz might have the title "About - FooBaz".

This sort of setup can be achieved in an AngularJS application using the ``view-title`` directive. First,
set up your title element to bind to the special scope variable ``viewTitle``, which will be set when
a titled view is instantiated:

```html
<title ng-bind-template="{{viewTitle}} - FooBaz">FooBaz</title>
```

With this in place, add to each view's template a single ``view-title`` element setting the view's title:

```html
<view-title>About</view-title>
```

The content of the element may contain interpolated expressions just like any other element in an AngularJS
template, but the content (after any HTML elements have been stripped) will appear in the main page title
rather than in the document.

It's common for there to already be an element in the template containing the view title. If that is the
case for your application, you can avoid redundancy by instantiating the directive as an attribute:

```html
<h2 view-title>About</h2>
```

In this case, the text content of the element (after interpolation) will be mirrored into the view title,
and any later changes to the content will cause the title to be updated.

The ``view-title`` directive should only be used in a view template, and only one instance of it should
appear per view. It should also not be nested inside any element which creates a local scope, such as
``ng-repeat``. If any of these rules are violated the behavior will be unpredictable.

Since the ``viewTitle`` variable is just a normal variable in the global scope, you can of course use
it anywhere in your root template, so the view title could be displayed in other spots as well.

Adding Per-view HTML metadata elements
--------------------------------------

There are sometimes other elements in the HTML head that vary between views. Examples include RSS feed links
and Facebook open graph metadata. This markup is parsed primarily by robots like search engine crawlers,
so having your AngularJS app generate them dynamically via JavaScript will not be useful alone, but if you
create static snapshots of your application to serve to robots, for example using a service like
[BromBone](http://www.brombone.com/), this module can be an effective way to include machine-readable
metadata in those snapshots.

To add per-view metadata elements to the HTML head, place them near the top of your view template (it doesn't
really matter where you put them as long as the are directly in the view scope, not nested inside something
like `ng-repeat`) and add the ``view-head`` directive attribute. For example:

```html
<link view-head rel="alternate" type="application/rss+xml" href="{{rssUrl}}">
<meta view-head property="og:type" content="article">
```

Elements with the ``view-head`` directive will be compiled and evaluated in the scope in which they are
declared (so ``rssUrl`` can be defined by the view-specific controller) but they will actually appear in
the HTML ``head`` element. They will remain there until the view changes, at which point they will be
automatically removed.

The ``view-head`` directive can be used on any number of elements, but it only makes sense to use it on
elements that are valid in the ``head`` element. No attempt is made to automatically override similar
elements that were originally defined in the head, so e.g. if your main HTML file already includes an
RSS link the view-specific one will appear *in addition to* the main one. Using this directive in spots
other than directly inside the view scope will result in undefined behavior.

Copyright & License
-------------------

Copyright 2013 Martin Atkins. All Rights Reserved.

This may be redistributed under the MIT licence. For the full license terms, see the LICENSE file which
should be alongside this readme.

