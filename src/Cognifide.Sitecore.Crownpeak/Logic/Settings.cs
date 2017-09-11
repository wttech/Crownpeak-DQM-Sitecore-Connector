﻿using SitecoreSettings = Sitecore.Configuration.Settings;

namespace Cognifide.Sitecore.Crownpeak.Logic
{
    public static class Settings
    {
        public static string ApiKey
        {
            get
            {
                return SitecoreSettings.GetSetting("Crownpeak.ApiKey");
            }
        }

        public static string WebsiteId
        {
            get
            {
                return SitecoreSettings.GetSetting("Crownpeak.WebsiteId");
            }
        }

        public static int RetryCount
        {
            get
            {
                return SitecoreSettings.GetIntSetting("Crownpeak.RetryCount", 1);
            }
        }
    }
}