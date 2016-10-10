## RSSLists

RSSLists is a Chrome Extension that displays numerous RSS feeds in a row of lists on the new tab page. This allows users to view all their preferred sources of information in one place. RSSLists also displays the current date and weather for convenience. Ther is also a notetaking feature. 

[RSSLists on the Chrome Web Store][RSSurl]
[RSSurl]:https://chrome.google.com/webstore/detail/rsslists/mbaofboiknappfdajehfhhhlcmjldnpj

### Background

I created this extension because most RSS readers seem to either combine all feeds into one feed, or have a sidebar of all feeds that users can view one at a time. I wanted to create an RSS reader that displays all sources of information at once, while retaining their classifications by source. I got inspiration for the horizonal lists from Trello. I believe that multi-touch trackpads on modern laptops make this a viable concept for accessing a large amount of information at once.


### Features

- Includes 20 RSS feeds and the ability to add RSS feeds by url
- Includes 4 high resolution backgrounds and the ability to add a background by url
- Displays the current date, weather, and notetaking area
- Feeds, background, and notes persist using Chrome storage

### Architecture and Technologies

- JavaScript
- ReactJS

### Instructions

To use, download from the [Chrome Web Store][RSSurl]. Once installed, visit a new tab to begin adding lists. If you encounter any problems, ensure that you don't already have a Chrome extension installed that uses the new tab page.

<img src="../docs/screenshots/main.png" width="70%" />

To add feeds, click the list icon in the chrome extensions top bar. You'll see a list of preloaded feeds, as well as the option to add your own feeds via url. When you click a feed or the add buttom (for add feed by url), it will be appended to the right of your existing lists.

<img src="../docs/screenshots/add.png" width="70%" />

To change the background image, click the image icon in the bottom right corner of the date/weather/note list. I've included 4 high resolution images, but you can also add your own background from any image url.

<img src="../docs/screenshots/background.png" width="70%" />

To change the color of the date/weather/note list, click the color wheel in the bottom right corner. From here you can change the color and transparency.

<img src="../docs/screenshots/color.png" width="70%" />


### Code Snippets

Perhaps the most technically challenging part of this project was parsing various RSS feeds to get the right information. Unfortunately, not all RSS feeds are the same. Therefore I had to add various conditionals to account for variations in the feeds.

The following code is used to format each list. The length and complexity is merely to account for variations in specific lists.

```js
let fpLis = [];
  if(this.state.data) {
    this.listImg = Array.from(this.state.data.getElementsByTagName("img"));
    if (this.listImg.length < 1) {
      let image = Array.from(this.state.data.getElementsByTagName("image"));
        if(image.length > 0) {
          let imgRegex = /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*.(jpg|jpeg|png|gif))/gi;
          this.listImg = imgRegex.exec(image[0].innerHTML)[0];
        } else {
          this.listImg = null;
        }
    }
    this.listTitle = Array.from(this.state.data.getElementsByTagName("title"))[0].innerHTML;
    let entries = Array.from(this.state.data.getElementsByTagName("entry"));
    let items = Array.from(this.state.data.getElementsByTagName("item"));


    let toAdd = entries.length > 0 ? entries : items;

    toAdd.forEach(item => {
      let title = item.getElementsByTagName("title")[0].innerHTML;
      title = title.replace("<![CDATA[","");
      title = title.replace("]]>","");
      let link = item.getElementsByTagName("link");
      let img = null;
      let content = item.getElementsByTagName("content");
      if(content[0]) {
        img = content[0].getAttribute("url");
        if(!img && content[0]) {
          let regex = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i;
          let match = regex.exec(content[0].innerHTML);
          if(match) img = match[0];
        }
      } else {
        let description = item.getElementsByTagName("description");
        if(description[0] && !img) {
          let regex = /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*.(jpg|jpeg|png|gif))/gi;
          let match = regex.exec(description[0].innerHTML);
          if(match) img = match[0];
        }
      }

      if(!img) {
        let thumbnail = Array.from(item.getElementsByTagName("thumbnail"));
        if(thumbnail[0]) {
          img = thumbnail[0].getAttribute("url");
        }
      }

      link = link[0].innerHTML ? link[0].innerHTML : link[0].getAttribute("href");
      fpLis.push(<a href={link}><li className="outerLink" style={styles.item}><img src={img ? img : '../../assets/img/no_img.png'} style={styles.image}></img>{title}</li></a>);
    });
  }
```


### Future Direction

In the future, I would like to use mutliple APIs to display feeds for a user's specific accounts rather than general RSS feeds. For example, a user could see his/her specific Facebook, Twitter, Reddit, email, etc.