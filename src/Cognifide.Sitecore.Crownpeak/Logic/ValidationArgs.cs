﻿using Cognifide.Sitecore.Crownpeak.Service.Model;

namespace Cognifide.Sitecore.Crownpeak.Logic
{
    public class ValidationArgs
    {
        public string Content { get; set; }
        public string AssetId { get; set; }
        public int TotalErrors { get; set; }
        public int TotalCheckpoints { get; set; }
        public Checkpoint[] List { get; set; }
        public string[] Source { get; set; }
        public string Preview { get; set; }
    }
}
