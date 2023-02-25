interface Video {
  id: string;
  title: string;
  // description: string;
  // category: string;
}

interface ThirdPartyYouTubeLib {
  popularVideos(): Map<string, Video>;
  getVideoInfo(videoId: string): Video;
}

class ThirdPartyYouTubeImplementation implements ThirdPartyYouTubeLib {
  private experienceNetworkLatency() {
    // TODO: some latency needed
  }

  private connectToServer(server: string) {
    console.log(`Connecting to ${server}...`);

    this.experienceNetworkLatency();

    console.log("Connected!");
  }

  private getRandomVideos() {
    console.log("Downloading populars... ");

    this.experienceNetworkLatency();

    const videos = new Map<string, Video>();

    videos.set("catzzzzzzzzz", { id: "sadgahasgdas", title: "Catzzzz.avi" });
    videos.set("mkafksangasj", {
      id: "mkafksangasj",
      title: "Dog play with ball.mp4",
    });
    videos.set("dancesvideoo", {
      id: "asdfas3ffasd",
      title: "Dancing video.mpq",
    });
    videos.set("dlsdk5jfslaf", {
      id: "dlsdk5jfslaf",
      title: "Barcelona vs RealM.mov",
    });
    videos.set("3sdfgsd1j333", {
      id: "3sdfgsd1j333",
      title: "Programing lesson#1.avi",
    });

    console.log("Done!");

    return videos;
  }

  private getSomeVideo(videoId: string) {
    console.log("Downloading video... ");

    this.experienceNetworkLatency();

    const video = { id: videoId, title: "Some video title" } as Video;

    console.log("Done!" + "\n");

    return video;
  }

  popularVideos(): Map<string, Video> {
    this.connectToServer("http://www.youtube.com");

    return this.getRandomVideos();
  }

  getVideoInfo(videoId: string): Video {
    this.connectToServer(`http://www.youtube.com/${videoId}`);

    return this.getSomeVideo(videoId);
  }
}

class YouTubeCacheProxy implements ThirdPartyYouTubeLib {
  private youtubeService: ThirdPartyYouTubeLib;
  private cachePopular: Map<string, Video>;
  private cacheAll: Map<string, Video>;

  constructor() {
    this.youtubeService = new ThirdPartyYouTubeImplementation();
    this.cacheAll = new Map<string, Video>();
    this.cachePopular = new Map<string, Video>();
  }

  popularVideos(): Map<string, Video> {
    if (this.cachePopular.size === 0) {
      this.cachePopular = this.youtubeService.popularVideos();
    } else {
      console.log("Retrieved list from cache");
    }

    return this.cachePopular;
  }

  getVideoInfo(videoId: string): Video {
    let video = this.cacheAll.get(videoId);

    if (!video) {
      video = this.youtubeService.getVideoInfo(videoId);

      this.cacheAll.set(videoId, video);
    } else {
      console.log(`Retrieved video ${videoId} from cache`);
    }

    return video;
  }

  reset() {
    this.cacheAll.clear();
    this.cachePopular.clear();
  }
}

class YouTubeDownloader {
  private readonly api: ThirdPartyYouTubeLib;

  constructor(api: ThirdPartyYouTubeLib) {
    this.api = api;
  }

  renderVideoPage(videoId: string) {
    const video: Video = this.api.getVideoInfo(videoId);

    console.log("\n-------------------------------");
    console.log("Video page (imagine fancy HTML)");
    console.log("ID: " + video.id);
    console.log("Title: " + video.title);
    // console.log("Video: " + video.data);
    console.log("-------------------------------\n");
  }

  renderPopularVideos() {
    const videos: Map<string, Video> = this.api.popularVideos();

    console.log("\n-------------------------------");
    console.log("Most popular videos on YouTube (imagine fancy HTML)");

    for (const video of videos.values()) {
      console.log("ID: " + video.id + " / Title: " + video.title);
    }

    console.log("-------------------------------\n");
  }

  reactOnUserInput(videoId: string) {
    this.renderVideoPage(videoId);
    this.renderPopularVideos();
  }
}

(function () {
  const smartDownloader = new YouTubeDownloader(new YouTubeCacheProxy());

  // video will be loaded from youtube.com
  smartDownloader.renderVideoPage("catzzzzzzzzz");

  // video will be loaded from cache
  smartDownloader.renderVideoPage("catzzzzzzzzz");
})();
