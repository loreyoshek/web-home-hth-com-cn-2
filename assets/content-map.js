// assets/content-map.js
// 站点内容分区与搜索过滤函数

const siteConfig = {
  baseUrl: "https://web-home-hth.com.cn",
  siteName: "华体会内容平台",
  defaultLang: "zh-CN"
};

const contentSections = [
  {
    id: "sec-news",
    title: "新闻动态",
    description: "平台最新资讯与行业报道",
    tags: ["华体会", "新闻", "动态", "更新"],
    items: [
      { title: "华体会平台升级公告", date: "2025-02-10", url: "/news/upgrade" },
      { title: "行业交流会议邀请", date: "2025-02-08", url: "/news/conference" },
      { title: "华体会用户增长报告", date: "2025-02-05", url: "/news/growth" }
    ]
  },
  {
    id: "sec-guide",
    title: "使用指南",
    description: "帮助用户快速上手各项功能",
    tags: ["华体会", "指南", "教程", "帮助"],
    items: [
      { title: "注册与登录说明", date: "2025-01-20", url: "/guide/register" },
      { title: "内容发布流程", date: "2025-01-18", url: "/guide/publish" },
      { title: "常见问题解答", date: "2025-01-15", url: "/guide/faq" }
    ]
  },
  {
    id: "sec-activity",
    title: "活动专区",
    description: "线上线下活动聚合展示",
    tags: ["华体会", "活动", "互动", "福利"],
    items: [
      { title: "春季签到领积分", date: "2025-03-01", url: "/activity/spring" },
      { title: "华体会知识竞赛", date: "2025-02-20", url: "/activity/quiz" },
      { title: "用户创作激励计划", date: "2025-02-15", url: "/activity/create" }
    ]
  },
  {
    id: "sec-about",
    title: "关于我们",
    description: "平台介绍与联系方式",
    tags: ["华体会", "关于", "联系", "简介"],
    items: [
      { title: "平台愿景与使命", date: "2025-01-01", url: "/about/mission" },
      { title: "团队介绍", date: "2025-01-01", url: "/about/team" },
      { title: "商务合作", date: "2025-01-01", url: "/about/cooperation" }
    ]
  }
];

// 按关键词搜索内容分区及项目
function searchContent(query) {
  if (!query || typeof query !== "string") {
    return [];
  }
  const lowerQuery = query.toLowerCase();
  const results = [];

  for (const section of contentSections) {
    const matchedItems = [];
    const sectionMatch =
      section.title.toLowerCase().includes(lowerQuery) ||
      section.description.toLowerCase().includes(lowerQuery) ||
      section.tags.some(tag => tag.toLowerCase().includes(lowerQuery));

    for (const item of section.items) {
      if (
        item.title.toLowerCase().includes(lowerQuery) ||
        item.url.toLowerCase().includes(lowerQuery)
      ) {
        matchedItems.push(item);
      }
    }

    if (sectionMatch || matchedItems.length > 0) {
      results.push({
        sectionId: section.id,
        sectionTitle: section.title,
        sectionMatch: sectionMatch,
        items: matchedItems.length > 0 ? matchedItems : section.items
      });
    }
  }

  return results;
}

// 根据标签过滤分区
function filterByTag(tag) {
  if (!tag || typeof tag !== "string") {
    return [];
  }
  const lowerTag = tag.toLowerCase();
  return contentSections.filter(section =>
    section.tags.some(t => t.toLowerCase() === lowerTag)
  );
}

// 获取所有分区的标签列表（去重）
function getAllTags() {
  const tagSet = new Set();
  for (const section of contentSections) {
    for (const tag of section.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet);
}

// 演示用法
function demoUsage() {
  console.log("=== 华体会内容地图演示 ===");
  console.log("站点:", siteConfig.baseUrl);
  console.log("所有标签:", getAllTags().join(", "));
  console.log("\n搜索 '华体会':");
  const results = searchContent("华体会");
  results.forEach(r => {
    console.log(`  [${r.sectionTitle}] ${r.sectionMatch ? "(分区匹配)" : ""}`);
    r.items.forEach(item => console.log(`    - ${item.title} (${item.url})`));
  });
  console.log("\n按标签 '教程' 过滤:");
  const tagged = filterByTag("教程");
  tagged.forEach(s => console.log(`  ${s.title}`));
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { siteConfig, contentSections, searchContent, filterByTag, getAllTags };
}