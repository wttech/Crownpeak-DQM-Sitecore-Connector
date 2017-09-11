define(["sitecore", "/-/speak/v1/ExperienceEditor/ExperienceEditor.js"], function (Sitecore, ExperienceEditor) {
    Sitecore.Commands.ShowCrownpeakDQM =
    {
        canExecute: function () {
            return true;
        },

        execute: function (context) {
            var db = "&db=" + context.currentContext.database;
            var vs = "&vs=" + context.currentContext.version;
            var ln = "&ln=" + context.currentContext.language;
            var id = "&id=" + context.currentContext.itemId;
            top.window.location.href = '/sitecore/shell/default.aspx?xmlcontrol=Crownpeak.PreviewTab&dqmee=1' + db + vs + ln + id;
        }
    };
});