import type {
  WorkshopBiography,
  WorkshopGalleryImage,
  WorkshopResource,
  WorkshopScheduleItem,
} from "@/server/content/siteUpdates";
import { isSafeImageUrl, isSafeLinkUrl } from "@/utils/content/urls";

type JsonObject = Record<string, unknown>;

function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isScheduleItem(value: unknown): value is WorkshopScheduleItem {
  return isObject(value)
    && isNonEmptyString(value.time)
    && Array.isArray(value.items)
    && value.items.every(isNonEmptyString);
}

export function isWorkshopScheduleJson(
  value: unknown,
): value is { schedule: WorkshopScheduleItem[] } {
  return isObject(value)
    && Array.isArray(value.schedule)
    && value.schedule.every(isScheduleItem);
}

function isResource(value: unknown): value is WorkshopResource {
  return isObject(value)
    && isNonEmptyString(value.label)
    && isSafeLinkUrl(value.url);
}

export function isWorkshopResourceList(value: unknown): value is WorkshopResource[] {
  return Array.isArray(value) && value.every(isResource);
}

export function isWorkshopResource(value: unknown): value is WorkshopResource {
  return isResource(value);
}

function isGalleryImage(value: unknown): value is WorkshopGalleryImage {
  return isObject(value)
    && isSafeImageUrl(value.src)
    && isNonEmptyString(value.alt);
}

export function isWorkshopGallery(value: unknown): value is WorkshopGalleryImage[] {
  return Array.isArray(value) && value.every(isGalleryImage);
}

function isBiography(value: unknown): value is WorkshopBiography {
  return isObject(value)
    && isNonEmptyString(value.name)
    && (value.role === undefined || isNonEmptyString(value.role))
    && Array.isArray(value.paragraphs)
    && value.paragraphs.every(isNonEmptyString);
}

export function isWorkshopBiographyList(value: unknown): value is WorkshopBiography[] {
  return Array.isArray(value) && value.every(isBiography);
}

export function validateWorkshopJsonField(fieldKey: string, value: unknown): string | null {
  switch (fieldKey) {
    case "schedule_json":
      return isWorkshopScheduleJson(value)
        ? null
        : 'must be an object with a "schedule" array of { "time", "items" } entries.';
    case "resources_json":
      return isWorkshopResourceList(value)
        ? null
        : 'must be an array of { "label", "url" } entries with safe URLs.';
    case "registration_json":
      return isWorkshopResource(value)
        ? null
        : 'must be an object with a non-empty "label" and safe "url".';
    case "gallery_json":
      return isWorkshopGallery(value)
        ? null
        : 'must be an array of { "src", "alt" } entries with safe image URLs.';
    case "biographies_json":
      return isWorkshopBiographyList(value)
        ? null
        : 'must be an array of { "name", optional "role", "paragraphs" } entries.';
    default:
      return null;
  }
}
