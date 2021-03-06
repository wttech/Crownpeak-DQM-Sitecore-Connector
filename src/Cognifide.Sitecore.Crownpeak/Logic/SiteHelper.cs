using System;
using System.Collections.Generic;
using System.Linq;
using Sitecore.Data.Items;
using Sitecore.Web;

namespace Cognifide.Sitecore.Crownpeak.Logic
{
    public static class SiteHelper
    {
        private static IEnumerable<SiteInfo> _sites;

        public static IEnumerable<SiteInfo> Sites
        {
            get
            {
                return _sites ?? (_sites = global::Sitecore.Configuration.Settings.Sites.Where(s => s.EnablePreview).ToList());
            }
        }

        public static SiteInfo GetSiteInfo(Item item)
        {
            SiteInfo site = null;
            if (item != null)
            {
                site = Sites.FirstOrDefault(s => PathsMatch(s, item) && LanguagesMatch(s, item)) ??
                       Sites.FirstOrDefault(s => PathsMatch(s, item));
            }
            return site;
        }

        private static bool PathsMatch(SiteInfo site, Item item)
        {
            return item.Paths.FullPath.StartsWith(site.RootPath, StringComparison.InvariantCultureIgnoreCase);
        }

        private static bool LanguagesMatch(SiteInfo site, Item item)
        {
            return item.Language.Name == site.Language;
        }
    }
}