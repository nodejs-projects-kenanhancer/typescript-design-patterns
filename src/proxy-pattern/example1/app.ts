interface Video {
  id: string;
  title: string;
  description: string;
  category: string;
}

interface ThirdPartyYouTubeLib {
  listVideos(): Record<string, Video>;
  getVideoInfo(videoId: string): Video;
}

class ThirdPartyYouTubeClass implements ThirdPartyYouTubeLib {
  listVideos(): Record<string, Video> {
    throw new Error("Method not implemented.");
  }

  getVideoInfo(videoId: string): Video {
    throw new Error("Method not implemented.");
  }
}

class YouTubeCacheProxy implements ThirdPartyYouTubeLib {
  private youtubeService: ThirdPartyYouTubeLib;

  constructor() {
    this.youtubeService = new ThirdPartyYouTubeClass();
  }

  listVideos(): Record<string, Video> {
    throw new Error("Method not implemented.");
  }

  getVideoInfo(videoId: string): Video {
    throw new Error("Method not implemented.");
  }
}

class YouTubeDownloader {
  constructor(private readonly api: ThirdPartyYouTubeLib) {}

  renderVideoPage(videoId: string) {
    const video: Video = this.api.getVideoInfo(videoId);
  }

  renderPopularVideos() {
    const videos: Record<string, Video> = this.api.listVideos();
  }
}

(function(){
    const nativeDownloader = new YouTubeDownloader(new ThirdPartyYouTubeClass());

    const smartDownloader = new YouTubeDownloader(new YouTubeCacheProxy());
})();