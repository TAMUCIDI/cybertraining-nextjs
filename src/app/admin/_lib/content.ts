export type FieldKind =
  | "text"
  | "textarea"
  | "url"
  | "date"
  | "datetime"
  | "number"
  | "boolean"
  | "select"
  | "json";

export type FieldOption = {
  label: string;
  value: string;
};

export type ContentField = {
  key: string;
  label: string;
  kind: FieldKind;
  required?: boolean;
  placeholder?: string;
  help?: string;
  options?: FieldOption[];
  defaultValue?: string | number | boolean;
  fullWidth?: boolean;
  requiresMigration?: boolean;
  pageKeys?: string[];
  urlUsage?: "link" | "image";
};

export type ContentCollection = {
  key: string;
  table: string;
  singular: string;
  plural: string;
  description: string;
  titleField: string;
  secondaryField?: string;
  listFields: string[];
  fields: ContentField[];
  requiresMigration?: boolean;
  previewPath?: (row: Record<string, unknown>) => string | null;
};

const statusField: ContentField = {
  key: "status",
  label: "Status",
  kind: "select",
  required: true,
  defaultValue: "draft",
  requiresMigration: true,
  options: [
    { label: "Draft", value: "draft" },
    { label: "Published", value: "published" },
    { label: "Archived", value: "archived" },
  ],
};

const publishingFields: ContentField[] = [
  statusField,
  {
    key: "featured",
    label: "Featured",
    kind: "boolean",
    defaultValue: false,
    requiresMigration: true,
    help: "Feature this item ahead of standard chronological ordering.",
  },
  {
    key: "display_order",
    label: "Display order",
    kind: "number",
    defaultValue: 0,
    requiresMigration: true,
    help: "Lower numbers appear first when manual ordering is used.",
  },
  {
    key: "published_at",
    label: "Published at",
    kind: "datetime",
    requiresMigration: true,
  },
];

export const contentCollections: Record<string, ContentCollection> = {
  notebooks: {
    key: "notebooks",
    table: "notebooks",
    singular: "module",
    plural: "Modules",
    description: "Notebook, HTML, and PDF learning modules.",
    titleField: "title",
    secondaryField: "author",
    listFields: ["title", "category", "author", "status", "updated_at"],
    previewPath: (row) => `/notebooks/${String(row.slug || row.id)}`,
    fields: [
      { key: "title", label: "Title", kind: "text", required: true, fullWidth: true },
      {
        key: "slug",
        label: "Slug",
        kind: "text",
        required: true,
        requiresMigration: true,
        help: "Stable public URL segment. It is generated from the title for new records.",
      },
      { key: "category", label: "Category", kind: "text" },
      { key: "author", label: "Author or authors", kind: "text", fullWidth: true },
      {
        key: "description",
        label: "Summary",
        kind: "textarea",
        fullWidth: true,
        requiresMigration: true,
      },
      {
        key: "file_url",
        label: "Notebook HTML or PDF URL",
        kind: "url",
        required: true,
        fullWidth: true,
      },
      {
        key: "thumbnail_r2_url",
        label: "Cover image URL",
        kind: "url",
        urlUsage: "image",
        fullWidth: true,
      },
      {
        key: "source_url",
        label: "Original source URL",
        kind: "url",
        fullWidth: true,
        requiresMigration: true,
      },
      ...publishingFields,
    ],
  },
  workshops: {
    key: "workshops",
    table: "workshops",
    singular: "workshop",
    plural: "Workshops",
    description: "Programs, schedules, registration, resources, and galleries.",
    titleField: "title",
    secondaryField: "location",
    listFields: ["title", "date", "location", "status", "updated_at"],
    previewPath: (row) => `/workshops/${String(row.slug || row.id)}`,
    fields: [
      { key: "title", label: "Title", kind: "text", required: true, fullWidth: true },
      {
        key: "slug",
        label: "Slug",
        kind: "text",
        required: true,
        requiresMigration: true,
        help: "Stable public URL segment.",
      },
      { key: "date", label: "Start date", kind: "date", required: true },
      { key: "end_date", label: "End date", kind: "date", requiresMigration: true },
      { key: "location", label: "Location", kind: "text", fullWidth: true },
      { key: "description", label: "Description", kind: "textarea", fullWidth: true },
      { key: "photo_url", label: "Cover image URL", kind: "url", urlUsage: "image", fullWidth: true },
      {
        key: "photo_alt",
        label: "Cover image alternative text",
        kind: "text",
        fullWidth: true,
        requiresMigration: true,
      },
      {
        key: "image_fit",
        label: "Image fit",
        kind: "select",
        required: true,
        defaultValue: "cover",
        requiresMigration: true,
        options: [
          { label: "Crop to cover", value: "cover" },
          { label: "Show full image", value: "contain" },
        ],
      },
      { key: "mdx_url", label: "Program or MDX URL", kind: "url", fullWidth: true },
      {
        key: "schedule_json",
        label: "Schedule JSON",
        kind: "json",
        fullWidth: true,
        placeholder: '{\n  "schedule": [\n    { "time": "9:00 am", "items": ["Welcome"] }\n  ]\n}',
        help: "Use the existing { schedule: [...] } shape.",
      },
      {
        key: "resources_json",
        label: "Resources JSON",
        kind: "json",
        fullWidth: true,
        requiresMigration: true,
        placeholder: '[{ "label": "View agenda", "url": "https://..." }]',
      },
      {
        key: "registration_json",
        label: "Registration JSON",
        kind: "json",
        fullWidth: true,
        requiresMigration: true,
        placeholder: '{ "label": "Register", "url": "https://..." }',
      },
      {
        key: "gallery_json",
        label: "Gallery JSON",
        kind: "json",
        fullWidth: true,
        requiresMigration: true,
        placeholder: '[{ "src": "https://...", "alt": "Workshop participants" }]',
      },
      {
        key: "biographies_json",
        label: "Presenter biographies JSON",
        kind: "json",
        fullWidth: true,
        requiresMigration: true,
        placeholder: '[{ "name": "Name", "role": "Role", "paragraphs": ["Biography"] }]',
      },
      ...publishingFields,
    ],
  },
  webinars: {
    key: "webinars",
    table: "webinars",
    singular: "webinar",
    plural: "Webinars",
    description: "Recorded talks, speakers, descriptions, and thumbnails.",
    titleField: "title",
    secondaryField: "speaker",
    listFields: ["title", "date", "speaker", "status", "updated_at"],
    previewPath: (row) => `/webinars/${String(row.slug || row.id)}`,
    fields: [
      { key: "title", label: "Title", kind: "text", required: true, fullWidth: true },
      { key: "slug", label: "Slug", kind: "text", required: true, requiresMigration: true },
      { key: "date", label: "Date", kind: "date", required: true },
      { key: "speaker", label: "Speaker", kind: "text" },
      { key: "description", label: "Description", kind: "textarea", fullWidth: true },
      { key: "youtubeId", label: "YouTube video ID", kind: "text" },
      { key: "thumbnail_r2_url", label: "Thumbnail URL", kind: "url", urlUsage: "image", fullWidth: true },
      ...publishingFields,
    ],
  },
  people: {
    key: "people",
    table: "people",
    singular: "person",
    plural: "People",
    description: "Project leadership, members, and advisory board profiles.",
    titleField: "name",
    secondaryField: "affiliation",
    listFields: ["name", "role", "affiliation", "status", "updated_at"],
    fields: [
      { key: "name", label: "Name", kind: "text", required: true },
      { key: "slug", label: "Slug", kind: "text", required: true, requiresMigration: true },
      { key: "email", label: "Email", kind: "text" },
      {
        key: "role",
        label: "Content group",
        kind: "select",
        required: true,
        options: [
          { label: "Principal investigator", value: "PI" },
          { label: "Co-principal investigator", value: "Co-PI" },
          { label: "Member or advisory board", value: "Member" },
        ],
      },
      {
        key: "display_role",
        label: "Displayed role",
        kind: "text",
        requiresMigration: true,
        help: "Optional public label, such as Project Director or Advisory Board Chair.",
      },
      { key: "affiliation", label: "Affiliation", kind: "textarea", fullWidth: true },
      { key: "img_url", label: "Portrait URL", kind: "url", urlUsage: "image", fullWidth: true },
      {
        key: "profile_url",
        label: "External profile URL",
        kind: "url",
        fullWidth: true,
        requiresMigration: true,
      },
      {
        key: "visible_on_about",
        label: "Visible on About page",
        kind: "boolean",
        defaultValue: true,
        requiresMigration: true,
      },
      {
        key: "display_order",
        label: "Display order",
        kind: "number",
        defaultValue: 0,
        requiresMigration: true,
      },
      statusField,
    ],
  },
  news: {
    key: "news",
    table: "news",
    singular: "news article",
    plural: "News",
    description: "Announcements and stories with optional workshop relationships.",
    titleField: "title",
    secondaryField: "excerpt",
    listFields: ["title", "date", "status", "featured", "updated_at"],
    requiresMigration: true,
    previewPath: (row) => `/news/${String(row.slug || row.id)}`,
    fields: [
      { key: "title", label: "Title", kind: "text", required: true, fullWidth: true },
      { key: "slug", label: "Slug", kind: "text", required: true },
      { key: "date", label: "Story date", kind: "date" },
      { key: "excerpt", label: "Summary", kind: "textarea", fullWidth: true },
      { key: "body", label: "Article body", kind: "textarea", fullWidth: true },
      { key: "image_url", label: "Cover image URL", kind: "url", urlUsage: "image", fullWidth: true },
      { key: "image_alt", label: "Cover image alternative text", kind: "text", fullWidth: true },
      { key: "related_workshop_id", label: "Related workshop UUID", kind: "text" },
      ...publishingFields,
    ],
  },
  pages: {
    key: "pages",
    table: "pages",
    singular: "page",
    plural: "Page text",
    description: "Editable headings, summaries, and page-specific body content.",
    titleField: "title",
    secondaryField: "page_key",
    listFields: ["title", "page_key", "status", "updated_at"],
    requiresMigration: true,
    previewPath: (row) => {
      if (row.page_key === "home") return "/";
      if (row.page_key === "modules") return "/notebooks";
      return `/${String(row.page_key)}`;
    },
    fields: [
      { key: "page_key", label: "Page key", kind: "text", required: true, help: "Examples: home, about, modules." },
      { key: "title", label: "Internal title", kind: "text", required: true },
      {
        key: "eyebrow",
        label: "Eyebrow",
        kind: "text",
        pageKeys: ["about", "modules", "workshops", "webinars", "news"],
      },
      { key: "heading", label: "Public heading", kind: "textarea", fullWidth: true },
      { key: "summary", label: "Summary", kind: "textarea", fullWidth: true },
      {
        key: "body",
        label: "Mission body text",
        kind: "textarea",
        fullWidth: true,
        pageKeys: ["about"],
        help: "Used on the About page. Separate paragraphs with a blank line.",
      },
      { key: "image_url", label: "About image URL", kind: "url", urlUsage: "image", fullWidth: true, pageKeys: ["about"] },
      { key: "image_alt", label: "About image alternative text", kind: "text", fullWidth: true, pageKeys: ["about"] },
      statusField,
      { key: "published_at", label: "Published at", kind: "datetime" },
    ],
  },
  settings: {
    key: "settings",
    table: "site_settings",
    singular: "setting",
    plural: "Site settings",
    description: "Navigation, organization links, awards, and reusable structured values.",
    titleField: "label",
    secondaryField: "key",
    listFields: ["label", "key", "status", "updated_at"],
    requiresMigration: true,
    fields: [
      { key: "key", label: "Setting key", kind: "text", required: true },
      { key: "label", label: "Label", kind: "text", required: true },
      {
        key: "value_json",
        label: "Value JSON",
        kind: "json",
        required: true,
        fullWidth: true,
        placeholder: '{ "items": [] }',
      },
      statusField,
    ],
  },
};

export const collectionOrder = [
  "notebooks",
  "workshops",
  "webinars",
  "people",
  "news",
  "pages",
  "settings",
] as const;

export function getCollection(key: string) {
  return contentCollections[key];
}

export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

export function formatFieldLabel(key: string) {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
