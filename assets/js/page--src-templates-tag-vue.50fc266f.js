(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"2qYH":function(t,e,s){"use strict";s.r(e);var a={name:"Tag",components:{PostsWidget:s("HaB3").a}},n=s("7uw+"),i=null,l=Object(n.a)(a,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("layout",[s("div",{staticClass:"max-w-screen-md mx-auto"},[s("div",[s("g-link",{staticClass:"border-gray-600 border-2 p-2 my-2",attrs:{to:"/"}},[t._v("Back")])],1),s("h1",{staticClass:"text-center underline rounded-full text-indigo-600 font-bold p-4"},[t._v(t._s(t.$page.tag.title))]),0!==t.$page.tag.related.length?s("div",{staticClass:"p-4"},[s("p",{staticClass:"text-sm text-center"},[t._v("All posts that are related to this tag")]),s("posts-widget",{attrs:{posts:t.$page.tag.related}})],1):s("div",{staticClass:"text-center"},[t._v("This Tag is not used in any Post")])])])}),[],!1,null,"279b06ac",null);"function"==typeof i&&i(l);e.default=l.exports},HaB3:function(t,e,s){"use strict";var a={name:"PostsWidget",props:["posts"]},n=s("7uw+"),i=Object(n.a)(a,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"max-w-screen-md mx-auto list-none grid grid-cols-3 p-4"},t._l(t.posts,(function(e){return s("g-link",{staticClass:"hover:shadow-lg bg-gray-500 text-white p-6 m-2",attrs:{to:e.path}},[t._v("\n    "+t._s(e.title)+"\n  ")])})),1)}),[],!1,null,"208dfe5e",null);e.a=i.exports}}]);