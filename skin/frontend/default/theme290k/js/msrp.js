window.Catalog||(window.Catalog={}),Catalog.Map={helpLinks:[],active:!1,addHelpLink:function(a,b,c,d,e){if("string"==typeof a&&(a=$$(a)[0]),a){var f={link:a},g=!1;if("string"==typeof b&&b&&(f.title=b,g=!0),("string"==typeof c&&c||"object"==typeof c&&c)&&(f.price=c,g=!0),"string"==typeof d&&d&&(f.msrp=d,g=!0),"string"==typeof e&&e?f.cartLink=e:e&&e.url&&(f.cartLink=e.url,e.qty&&(f.qty=e.qty),e.notUseForm&&(f.notUseForm=e.notUseForm)),g){var h=this.helpLinks.push(f)-1;Event.observe(a,"click",this.showHelp.bind(this.helpLinks[h]))}else this.setGotoView(a,e);return f}},setGotoView:function(a,b){$(a).stopObserving("click"),a.href=b,window.opener?Event.observe(a,"click",function(a){setPLocation(this.href,!0),Catalog.Map.hideHelp(),a.stop()}):Event.observe(a,"click",function(a){setLocation(this.href),Catalog.Map.hideHelp(),window.opener.focus(),a.stop()})},showSelects:function(){var a=document.getElementsByTagName("select");for(i=0;i<a.length;i++)a[i].style.visibility="visible"},hideSelects:function(){var a=document.getElementsByTagName("select");for(i=0;i<a.length;i++)a[i].style.visibility="hidden"},showHelp:function(a){var b=$("map-popup"),c="undefined"===typeof document.body.style.maxHeight;if(b){var d=$$("body")[0];if(b.parentNode!=d){b.remove(),d.insert(b);var e=b.select(".paypal-logo > a > img")[0];e&&(e.src=e.src)}if(this!=Catalog.Map&&Catalog.Map.active!=this.link){b.style.display="none",b.offsetPosition||(b.offsetPosition={left:0,top:0}),b.removeClassName("map-popup-right"),b.removeClassName("map-popup-left"),Element.getWidth(d)<a.pageX+Element.getWidth(b)?b.addClassName("map-popup-left"):a.pageX-Element.getWidth(b)<0&&b.addClassName("map-popup-right"),b.style.left=a.pageX-Element.getWidth(b)/2-45+"px",b.style.top=a.pageY+10+"px";var f=$("map-popup-heading");"undefined"!=typeof this.title?(Element.update(f,this.title),$(f).show()):$(f).hide();var g=$("map-popup-msrp-box");"undefined"!=typeof this.msrp?(Element.update($("map-popup-msrp"),this.msrp),$(g).show()):$(g).hide();var h=$("map-popup-price-box");if("undefined"!=typeof this.price){var i="object"==typeof this.price?this.price.innerHTML:this.price;Element.update($("map-popup-price"),i),$(h).show()}else $(h).hide();var j=$("map-popup-button");if("undefined"!=typeof this.cartLink){"undefined"==typeof productAddToCartForm||this.notUseForm?(Catalog.Map.setGotoView(j,this.cartLink),productAddToCartForm=$("product_addtocart_form_from_popup")):(this.qty&&(productAddToCartForm.qty=this.qty),j.stopObserving("click"),j.href=this.cartLink,Event.observe(j,"click",function(){productAddToCartForm.action=this.href,productAddToCartForm.submit(this)})),productAddToCartForm.action=this.cartLink;var k=$("map-popup-product-id");k.value=this.product_id,$(j).show(),$$(".additional-addtocart-box").invoke("show")}else $(j).hide(),$$(".additional-addtocart-box").invoke("hide");var l=$("map-popup-text"),m=$("map-popup-text-what-this"),n=$("map-popup-content");g.visible()||h.visible()||j.visible()?($(m).hide(),$(l).show(),$(l).addClassName("map-popup-only-text"),$(n).show().setStyle({visibility:"visible"}),$("product_addtocart_form_from_popup").show()):($(l).hide(),$(m).show(),$(m).removeClassName("map-popup-only-text"),$(n).hide().setStyle({visibility:"hidden"}),$("product_addtocart_form_from_popup").hide()),$(b).show(),c&&Catalog.Map.hideSelects();var o=$("map-popup-close");o&&($(o).stopObserving("click"),Event.observe(o,"click",Catalog.Map.showHelp.bind(this)),Catalog.Map.active=this.link)}else $(b).hide(),c&&Catalog.Map.showSelects(),Catalog.Map.active=!1;Event.stop(a)}},hideHelp:function(){var a=$("map-popup");if(a){var b="undefined"===typeof document.body.style.maxHeight;$(a).hide(),b&&Catalog.Map.showSelects(),Catalog.Map.active=!1}},bindProductForm:function(){if("undefined"!=typeof productAddToCartForm&&productAddToCartForm)productAddToCartFormOld=productAddToCartForm,productAddToCartForm=new VarienForm("product_addtocart_form_from_popup"),productAddToCartForm.submitLight=productAddToCartFormOld.submitLight;else{if(!$("product_addtocart_form_from_popup"))return!1;"undefined"==typeof productAddToCartForm&&(productAddToCartForm=new VarienForm("product_addtocart_form_from_popup"))}productAddToCartForm.submit=function(a,b){if("undefined"!=typeof productAddToCartFormOld&&productAddToCartFormOld)return Catalog.Map.active&&Catalog.Map.hideHelp(),productAddToCartForm.qty&&$("qty")&&($("qty").value=productAddToCartForm.qty),parentResult=productAddToCartFormOld.submit(),!1;if(window.opener){var c=a;return void new Ajax.Request(this.form.action,{parameters:{isAjax:1,method:"GET"},onSuccess:function(){window.opener.focus(),c&&c.href&&(setPLocation(c.href,!0),Catalog.Map.hideHelp())}})}if(this.validator.validate()){var d=this.form,e=d.action;b&&(d.action=b),d.getAttribute("action")||(d.action=productAddToCartForm.action);try{this.form.submit()}catch(f){throw this.form.action=e,f}this.form.action=e,a&&"undefined"!=a&&(a.disabled=!0)}}.bind(productAddToCartForm)}},Event.observe(window,"resize",function(a){Catalog.Map.active&&Catalog.Map.showHelp(a)}),$(document).observe("bundle:reload-price",function(a){var b=a.memo,c=b.bundle;if(!Number(c.config.isMAPAppliedDirectly)&&!Number(c.config.isFixedPrice)){var d=!1;try{for(var e in c.config.selected){if(c.config.options[e]&&c.config.options[e].selections)for(var f=c.config.options[e].selections,g=0,h=c.config.selected[e].length;g<h;g++){var i=c.config.selected[e][g];if(Number(f[i].canApplyMAP)){d=!0;break}}if(d)break}}catch(j){d=!0}d?($$(".full-product-price").each(function(a){$(a).hide()}),$$(".map-info").each(function(a){$(a).show()}),a.noReloadPrice=!0):($$(".full-product-price").each(function(a){$(a).show()}),$$(".map-info").each(function(a){$(a).hide()}))}});