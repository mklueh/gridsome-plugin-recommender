(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{HaB3:function(t,e,s){"use strict";var n={name:"PostsWidget",props:["posts"]},i=s("7uw+"),a=Object(i.a)(n,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"max-w-screen-md mx-auto list-none grid grid-cols-3 p-4"},t._l(t.posts,(function(e){return s("g-link",{staticClass:"hover:shadow-lg bg-gray-500 text-white p-6 m-2",attrs:{to:e.path}},[t._v("\n    "+t._s(e.title)+"\n  ")])})),1)}),[],!1,null,"409c831d",null);e.a=a.exports},R53H:function(t,e,s){},SZAg:function(t,e,s){},XIpP:function(t,e,s){"use strict";var n={name:"tag-widget",props:["tags"]},i=(s("gn25"),s("7uw+")),a=Object(i.a)(n,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"grid grid-cols-3 p-4 gap-3"},t._l(t.tags,(function(e){return s("g-link",{key:e.id,staticClass:"tag bg-indigo-500 hover:shadow-lg rounded-full text-white text-center p-2 font-bold",attrs:{to:e.path}},[t._v("\n    "+t._s(e.title)+"\n  ")])})),1)}),[],!1,null,"a92791a4",null);e.a=a.exports},gEGz:function(t,e,s){"use strict";s("SZAg")},gn25:function(t,e,s){"use strict";s("R53H")},iyQ6:function(t,e,s){"use strict";s.r(e);s("2B1R");var n=s("HaB3"),i={components:{TagWidget:s("XIpP").a,PostsWidget:n.a},metaInfo:{title:"Showcase of the Gridsome Recommender Plugin!"},computed:{posts:function(){return this.$page.posts.edges.map((function(t){return{id:t.node.id,title:t.node.title,path:t.node.path}}))},tags:function(){return this.$page.tags.edges.map((function(t){return{id:t.node.id,title:t.node.title,path:t.node.path}}))}}},a=(s("gEGz"),s("7uw+")),o=null,l=Object(a.a)(i,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("Layout",[s("h1",{staticClass:"py-4 underline text-2xl text-center"},[t._v("\n    Showcase for the Gridsome Recommender Plugin\n    "),s("br"),t._v(" (by "),s("a",{staticClass:"text-indigo-600",attrs:{href:"https://twitter.com/mklueh90",target:"_blank"}},[t._v("Marian Klühspies")]),t._v(")\n  ")]),s("p",[t._v("\n    This Demo shows a simple implementation of the "),s("a",{attrs:{href:"https://github.com/mklueh/gridsome-plugin-recommender"}},[t._v("gridsome-plugin-recommender")]),t._v("\n    plugin.\n  ")]),s("div",{staticClass:"py-2"},[t._v("\n    It is used for two cases on this website:\n\n    "),s("ul",{staticClass:"list-disc p-4 font-bold"},[s("li",[t._v("Finding related posts")]),s("li",[t._v("Finding related tags")])])]),s("div",[t._v("\n    All available Tags\n    "),s("tag-widget",{attrs:{tags:this.tags}})],1),s("div",[t._v("\n    All available Posts\n    "),s("posts-widget",{attrs:{posts:this.posts}})],1)])}),[],!1,null,null,null);"function"==typeof o&&o(l);e.default=l.exports}}]);