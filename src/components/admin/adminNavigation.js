import {
  BriefcaseBusiness,
  FileText,
  FolderKanban,
  Image,
  LayoutDashboard,
  PanelsTopLeft,
  Settings,
} from "lucide-react";

export const adminLinks = [
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
    description: "Track content health and recent updates",
    keywords: ["dashboard", "overview", "stats"],
  },
  {
    label: "Banners",
    href: "/admin/banners",
    icon: PanelsTopLeft,
    description: "Edit hero messaging and CTAs",
    keywords: ["hero", "banner", "cta"],
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: BriefcaseBusiness,
    description: "Manage public service cards",
    keywords: ["service", "offerings"],
    countKey: "services",
  },
  {
    label: "Blog",
    href: "/admin/blog",
    icon: FileText,
    description: "Publish articles and summaries",
    keywords: ["posts", "articles", "content"],
    countKey: "blogPosts",
  },
  {
    label: "Careers",
    href: "/admin/careers",
    icon: FolderKanban,
    description: "Maintain open roles",
    keywords: ["jobs", "hiring", "roles"],
    countKey: "careers",
  },
  {
    label: "Media",
    href: "/admin/media",
    icon: Image,
    description: "Track website media assets",
    keywords: ["assets", "media", "images"],
    countKey: "mediaItems",
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
    description: "Update shared company details",
    keywords: ["configuration", "company", "contact"],
  },
];

export function getAdminPageMeta(pathname) {
  const matchedLink =
    adminLinks.find((link) => pathname === link.href) ||
    adminLinks.find((link) => link.href !== "/admin" && pathname.startsWith(link.href));

  if (!matchedLink) {
    return {
      label: "Admin Panel",
      description: "Manage the website content system.",
    };
  }

  return {
    label: matchedLink.label,
    description: matchedLink.description,
  };
}
