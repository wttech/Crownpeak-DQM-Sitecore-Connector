$.noConflict();

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

var animateTimeout;

function dqmSwitch(checked, id) {

    var nodes = jQuery('[data-dqm-id*="' + id + '"]', jQuery("#" + window.dqmPreviewFrame).contents());

    for (var k = 0; k < nodes.length; k++)
        jQuery(nodes[k]).toggleClass("dqmPreviewHighlight" + id);

    if (checked && nodes.length > 0) {
        // node offset - iframe offset - ambiguous offset
        var scrollTo = jQuery(nodes[0]).offset().top + jQuery("#" + window.dqmPreviewFrame).offset().top - 20;
        jQuery("html, body").animate({ scrollTop: scrollTo }, 1000);

        jQuery(nodes).addClass('dqmBlink');

        setTimeout(function () {
            jQuery('[data-dqm-id*="' + id + '"]', jQuery("#" + window.dqmPreviewFrame).contents())
                .removeClass('dqmBlink');
        }, 750 * 3 + 100); // 750 is blinking intevral in css
    }
}

function startup() {

    if (!(window.jQuery && window._ && window.checkpoints)) {
        setTimeout(function () { startup(); }, 50);
    }

    var resizeTimeout;

    function setIframeHeight(frame) {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            var h = frame.contentWindow.document.body.scrollHeight + 10;
            jQuery(frame).css({
                height: h,
            });
        }, 1000);
    }

    var $pageIframe = jQuery("#" + window.dqmPreviewFrame)[0];
    setIframeHeight($pageIframe);

    $pageIframe.on("load reload", function () {
        setIframeHeight($pageIframe);
    });


    window.onresize = function () {
        setIframeHeight($pageIframe);
    };




    var highlighted = _.filter(window.checkpoints, function (cp) { return cp.CanHighligh; });
    var nonHighlighted = _.filter(window.checkpoints, function (cp) { return !cp.CanHighligh; });

    var hTemplate = "<div class=\"leftNavigationTitle\" > \
                        <span class=\"titleSpan\">Highlighted issues</span> \
                          <span class=\"count\"> <%= _.reduce(_.map(highlighted,function(x) { return x.IssueCount; }), function(sum, value) { return sum + value; }, 0) %> </span>\
                    </div> \
                    <% for (var i = 0; i < highlighted.length; i++) { %> \
                        <div class='issue hissueBody<%= i %>' > \
                            <div class='issueHeader dqmTooltip' onclick=\"jQuery('.hissueBody<%= i %>').toggleClass('expanded')\"> \
                                <span class='description' style='display:none'><%= highlighted[i].Description %></span> \
                                <span class='arrowIcon' ></span> \
                                <%- highlighted[i].Header %> \
                                <span class='count'><%= highlighted[i].IssueCount %> \
                            </div> \
                            <div class=\"iconsWrapper \" > \
                                <% if ( highlighted[i].CanShowSource ) { %> \
                                <span class=\"markupIcon actionIcon dqmTooltip\" onclick=\"scForm.showModalDialog('/sitecore/shell/default.aspx?xmlcontrol=Crownpeak.SourceTab&db=<%= getParameterByName('db') %>&id=<%= getParameterByName('id') %>&la=<%= getParameterByName('la') %>&vs=<%= getParameterByName('vs') %>&checkpointId=<%=highlighted[i].IssueId%>', null, '', null) \" ><img src=\"/Content/crownpeak/sourceview.png\" /> \
                                    <span class='description' style='display:none'>Show markup preview</span> </span> \
                                <% } %> \
                                <% if ( highlighted[i].CanHighligh ) { %> \
                                <input class=\"imageInput\"style=\"display:none\" type=\"checkbox\" id=\"hck<%=i%>\" onclick=\"dqmSwitch(this.checked,'<%=highlighted[i].IssueId%>')\" checked /> \
                                <label  class=\"actionIcon imageIcon dqmTooltip\" for=\"hck<%=i%>\"> <img  src=\"/Content/crownpeak/rendered-off.png\" class='dqmOff' /> \
                                <img  src=\"/Content/crownpeak/rendered-on.png\" class='dqmOn' />  \
                                <span class='description' style='display:none'>Toggle checkpoint highlight</span> \
                                </label> \
                                <% } %> \
                            </div > \
                        </div >  \
                    <% } %>";

    var nhTemplate = "<div class=\"leftNavigationTitle\"> \
                        <span class=\"titleSpan\">General issues</span> \
                        <span class=\"count\"> <%=nonHighlighted.length%> </span>\
                    </div> \
                    <% for (var i = 0; i < nonHighlighted.length; i++) { %> \
                        <div class='issue gissueBody<%= i %>'  > \
                            <div class='issueHeader dqmTooltip' onclick=\"jQuery('.gissueBody<%= i %>').toggleClass('expanded')\"> \
                            <span class='description' style='display:none'><%= nonHighlighted[i].Description %></span> \
                                <% if ( nonHighlighted[i].CanShowSource ) { %> \
                                    <span class='arrowIcon' ></span> \
                                    <% } %> \
                                    <%- nonHighlighted[i].Header %> \
                            </div> \
                            <div class=\"iconsWrapper \" > \
                            <% if ( nonHighlighted[i].CanShowSource ) { %> \
                                <span class=\"markupIcon actionIcon dqmTooltip\" onclick=\"scForm.showModalDialog('/sitecore/shell/default.aspx?xmlcontrol=Crownpeak.SourceTab&db=<%= getParameterByName('db') %>&id=<%= getParameterByName('id') %>&la=<%= getParameterByName('la') %>&vs=<%= getParameterByName('vs') %>&checkpointId=<%=nonHighlighted[i].IssueId%>', null, '', null) \" ><img src=\"/Content/crownpeak/sourceview.png\" /> \
                                    <span class='description' style='display:none'>Show markup preview</span> </span> \
                                <% } %> \
                        </div > \
                        </div >  \
                    <% } %>";

    jQuery(".dqmlist").append(_.template(hTemplate)({ highlighted: highlighted })).append(_.template(nhTemplate)({ nonHighlighted: nonHighlighted }));
    jQuery(".dqmTooltip").each(function () {
        jQuery(this).tooltip({ items: 'div, label, span', content: jQuery('.description', this).html(), show: { delay: 500 } });
    });
}
