
(function($) {  
    
    $(window).load(function() {   
        
        var enterChat = $('#enterChat'),
            scrollableContent = $('.scrollableContent'),
            email = $('#emailField input'),
            sendButton = $('.sendButton'),
            addAttachment = $('.addAttachment a'),
            addFile = $('.addFile'),
            textArea = $('#textArea'),
            defaultVal = 'Адреса єлектронної пошти',
            isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
        
        function viewModel() {
            var self = this;

            self.isChatOpened = ko.observable(false);
            self.isEmailPopupOpened = ko.observable(false);
            self.fileName = ko.observable('');
            self.file = ko.observable('');

            self.openChat = function () {
                checkSideButtonPosition();
                self.isChatOpened(true); 
                updateScroll();
            };

            self.closeChat = function () {
                self.isChatOpened(false);
                email.val(defaultVal);
                self.isEmailPopupOpened(true);
            };

            self.closeEmailPopup = function () {
                self.isEmailPopupOpened(false);
                enterChat.show();
            };

            self.sendMessage = function () {
                self.messages.push(new Message('user', textArea.val(), self.fileName()));
                textArea.val('');
                self.file('');
                //debugger;
                updateScroll();
                 
            };

            self.removeAttachment = function () {
                self.file('');
            };
            
            // optimize added file name before displaying
            self.file.subscribe(function (file) {
                self.fileName(file.split(/\\/).pop());
            });
            
            self.messages = ko.observableArray([
                new Message('support', 'Доброго дня, чим можу допомогти?', '')
            ]);
            
            function Message(type, text, file) {                
                this.type = type;                
                this.text = text;
                this.file = file;
                this.name = ko.computed(function() {
                    return type == 'user' ? "Ви" : "Підтримка";
                });
                this.date = moment(new Date()).format('(DD.MM.YY: hh:mm)');
            };  
    }
    ko.applyBindings(new viewModel());
    
    email.keyup(function () {
            if(validateEmail(email.val())) {
                sendButton.removeAttr("disabled");
            } else {
                sendButton.attr("disabled","disabled");
            }
        });
        
    email.focus(function () {
        if (email.val() == defaultVal) {
            email.val('');
        }
    });

    email.blur(function () {
        if (email.val() == '') {
            email.val(defaultVal);
        }
    });

    addAttachment.click(function(){
        addFile.trigger('click');
    });  
    
    scrollableContent.mCustomScrollbar({
        scrollInertia:0
    });
    
    if (isMobile) {
        scrollableContent.mCustomScrollbarMobile({
            scrollInertia:0
        });
    }
    
    function updateScroll () {
        scrollableContent.mCustomScrollbar("update");
        scrollableContent.mCustomScrollbar("scrollTo","bottom");
        if (isMobile) {
            crollableContent.mCustomScrollbarMobile("update");
        }
    };
    
    function checkSideButtonPosition() {
        if (enterChat.css("position") == "relative") {
            enterChat.hide();
        }
    }
    
    function validateEmail(email) { 
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
      
    })
})(jQuery);

