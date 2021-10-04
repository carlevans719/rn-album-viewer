import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import resemble from 'resemblejs';

const groupByTime = (images: MediaLibrary.Asset[], toleranceInSeconds = 20) => {
  const toleranceInMs = toleranceInSeconds * 1000;
  const imageIdMap = images.reduce((prev, curr) => ({ ...prev, [curr.id]: false }), {} as {[key:string]: boolean});

  const groups = [];
  let currIdx = 0;

  for (const image of images) {
    if (imageIdMap[image.id]) {
      continue;
    }

    if (!groups.length) {
      groups.push([image]);
      imageIdMap[image.id] = true;
      continue;
    }

    const compareTimestamp = groups[currIdx][groups[currIdx].length - 1].creationTime;
    if (
      (image.creationTime > compareTimestamp && (image.creationTime - compareTimestamp) < toleranceInMs) ||
      (image.creationTime < compareTimestamp && (compareTimestamp - image.creationTime) < toleranceInMs) ||
      (image.creationTime === compareTimestamp)
     ) {
      groups[currIdx].push(image);
      imageIdMap[image.id] = true;
      continue;
    }

    currIdx++;
    groups.push([image]);
    imageIdMap[image.id] = true;
  }

  return groups;
}

const uriToB64 = async (uri: string) => {
  const binary = await FileSystem.readAsStringAsync(uri, {});
  const blob = new Blob(new Uint16Array(binary));
}
const groupBySimilarity = async (groups: MediaLibrary.Asset[][]) => {
  for (const group of groups) {
    if (group.length) {
      let compareImage = group.shift() as MediaLibrary.Asset;
      let compareImageBin = await FileSystem.readAsStringAsync(compareImage.uri);
      let compareImageB64 = 
      for (const targetImage of group) {
        
      }
    }
  }
}

const fetchAllImages = async (album: MediaLibrary.Album) => {
  const images: MediaLibrary.Asset[] = [];

  const fetchPage = async (after?: string) => {
    const params: MediaLibrary.AssetsOptions = {
      album,
      first: 50,
    };

    if (after) {
      params.after = after;
    }

    const page = await MediaLibrary.getAssetsAsync(params)

    images.push(...page.assets);

    if (page.hasNextPage) {
      await fetchPage(page.endCursor);
    }
  }

  await fetchPage();

  return images;
}

export default async (album: MediaLibrary.Album) => {
  const images = await fetchAllImages(album);
  const groupedByTime = await groupByTime(images);
  return await groupBySimilarity(groupedByTime);
}
