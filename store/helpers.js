function sliceString (string) {
  let newString = string.slice(0, 90);

  if (newString.length < string.length) {
    newString += '...';
  }

  return newString;
}

function dateFormat (date) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

  return new Date(date).toLocaleDateString('en-GB', options).replace(/\//g, ' ');
}

export function getSearchVideosSubString (items) {
  let subString = '';

  for (let i = 0; i < 10; i++) {
    const item = items[i] || {};
    subString += `${item.id?.videoId}${i < 9 ? '%2C' : ''}`;
  }

  return subString;
}

export function getVideosArray (items) {
  return items.map((video) => {
    return {
      id: video.id || '',
      title: video.snippet?.title || '',
      channelTitle: video.snippet?.channelTitle || '',
      description: sliceString(video.snippet?.description) || '',
      publishTime: dateFormat(video.snippet?.publishedAt) || '',
      image: video.snippet?.thumbnails?.medium.url || '',
      viewCount: +video.statistics?.viewCount || 0
    };
  });
}
