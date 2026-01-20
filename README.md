# readii

## Todos

- [x] FIX: "thumbnail" in `getFeedData`
- [x] FIX: Update should not override isStarred etc.
- [x] FIX: Texts must be rendered within a `<Text>`c…
- [x] FIX: `<pre>` code block
- [x] FEAT: Handle videos in `<HtmlViewer>` (https://github.com/expo/expo/issues/39100)
- [x] FIX: Handle images correctly (nintendo article)
- [ ] PERF: Move `content` to files instead of in DB
- [x] CHORE: Check out Android App
- [x] FIX: Add App icon
- [x] FEAT: Beautify add screen
- [x] FEAT: Add Read/Unread feature
- [x] FIX: Video source retrieval
- [x] FEAT: Add interaction to **Buttons**
- [x] FEAT: Handle after submit behavior
- [x] FEAT: Delete button for folders
- [-] FEAT: Add simple Profile page
- [x] FEAT: Add wait list via google forms
- [ ] FIX: Webview internal links must open in separate browser
- [ ] FEAT: Add feed suggestions
- [ ] FEAT: Add language support to suggestions
- [ ] FEAT: Add option to mark all as read
- [ ] FEAT: Add background updates and notifications
- [ ] FEAT: Add feed settings
  - [ ] FEAT: add view options (Open with: Default / Viewer / In-App-Browser / Reader View)
  - [ ] FEAT: Add Feed URL & option to share link
  - [ ] FEAT: Manage Folder participation
- [ ] FEAT: Fetch og data / favicon etc.
- [x] FEAT: Implement `onRefresh` handling
- [ ] FEAT: Add Payment handling
```json
[
  "@stripe/stripe-react-native", {
    "merchantIdentifier": "merchant.com.anonymous.readiiapp",
    "publishableKey": "pk_test_51SC2ksQVrVh1kP5IzIa9JOUuyzygWQ1jyqYErW4bvK4E0cqOCrXr4sLxu634ROmqv6upvuFvt80menpoehqE1NOk00rUeyxUgl",
    "enableGooglePay": true
  }
],
```
- [x] FEAT: Add Folders / Collections
- [ ] FEAT: Open web links in webview
- [ ] FEAT: Fully support bluesky
- [ ] FEAT: Add support for Reddit
- [ ] FEAT: Add support for Newsletter
  - https://orm.drizzle.team/docs/get-started/sqlite-new#step-6---applying-changes-to-the-database
  - https://hono.dev/docs/getting-started/nodejs
  - https://kill-the-newsletter.com/feeds/tvuvsyy0mvhk0yd5x0qc
  - https://kill-the-newsletter.com/feeds/kewz3og88bmsed7avkxz.xml
- [ ] FEAT: Show website in reader mode
  - https://github.com/mozilla/readability
- [ ] FEAT: Add Onboarding Flow!
- [ ] FEAT: Add empty feed UI
- [x] FEAT: Allow deep linking (e.g. suggest cool content on social media and deep link)
  - [x] FEAT: add url param to /add/feed to allow prefill RSS Feeds
- [ ] FEAT: Add "All feeds" tab
- [ ] FEAT: Add support for Podcasts
  - [ ] FEAT: Transcribe Podcast to make it searchable
- [ ] FEAT: Add support for Google Alert
- [ ] FEAT: Add support for YouTube
- [ ] FEAT: Add "Weekly Digest", an AI generated summary of the week's news
  - https://www.youtube.com/watch?v=zReFsPgUdMs&list=WL&index=2

### Backlog

- [ ] FEAT: Search for Feeds
- [ ] FEAT: Transcribe Podcasts
- [ ] FEAT: Add Notifications
- [ ] FEAT: Add "Add to readii" in context menus of the browser

## Marketing

- Suggest cool RSS and deeplink into app
- Tutorial how to create RSS Feed - https://www.citationneeded.news/curate-with-rss/
- Suggest to Tech Newsletters (ui.dev)
- Expo Showcase?
- ProductHunt
- ifun kontaktieren
- Reddit Feedback
- Handpicked OPML on website
- Use hashtag #buildinpublic
- Post on https://www.reddit.com/r/rss/

## Helpful

- DOM Reference: `<link rel="alternate" type="application/rss+xml" title="RSS" href="https://...">`

## Example Feeds

- https://nerdy.dev/rss.xml
- https://lea.verou.me/feed.xml
- https://www.youtube.com/feeds/videos.xml?channel_id=UCcefcZRL2oaA_uBNeo5UOWg
- https://darknet-diaries-deutsch.podigee.io/feed/mp3
- https://sprind.podigee.io/feed/mp3
- https://infrequently.org/links/
- https://www.sovereign.tech/feed.rss
- https://www.smashingmagazine.com/feed/
- https://changelog.com/news/feed
- https://news.google.com/rss?hl=de&gl=DE&ceid=DE:de
- https://martinfowler.com/feed.atom
- https://news.ycombinator.com/rss
- https://cydstumpel.nl/feed
- https://css-tip.com/feed/feed.xml
- https://www.reddit.com/r/deutschephotovoltaik/new.rss
- https://api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?filter=posts_no_replies&actor=did:plc:fmwrdogxjglnbwalvoe6jdam&limit=100
- https://feeds.libsyn.com/582135/rss
- https://feeds.acast.com/public/shows/tabletoday

## Technical References & Libs

- https://www.rfc-editor.org/rfc/rfc4287
- https://datatracker.ietf.org/doc/html/rfc4287
- https://www.ietf.org/rfc/rfc5013.txt
- https://www.data2type.de/xml-xslt-xslfo/newsfeeds-rss-atom/referenz-atom-elemente
- https://github.com/mozilla/readability
- https://developers.cloudflare.com/email-routing/email-workers/
- Bluesky API: https://github.com/bluesky-social/atproto/tree/main/packages/xrpc
- Bluesky Search: https://api.bsky.app/xrpc/app.bsky.actor.searchActors?q=readii
- Bluesky Docs: https://docs.bsky.app/docs/api/app-bsky-feed-get-feed
- Youtube Search: https://www.youtube.com/results?sp=EgIQAg%3D%3D&search_query=veritasium
- Signal Link Preview: https://github.com/signalapp/Signal-Desktop/tree/ce0fb220411b97722e1e080c14faa65d23165784/ts/linkPreviews

## Competition

- https://www.distillintelligence.com/
- https://ground.news/
- https://www.inoreader.com/
- https://feedly.com/

## Inspiration

- https://kraa.io/kraa/examples/echolibrary
- https://rune.demo.luxethemes.com/
- https://insights.tryspecter.com/

## Fonts

- https://fonts.google.com/specimen/IBM+Plex+Serif
- https://www.fontshare.com/fonts/erode

## Curated Categories

- Featured
- Newspapers
- News & Politics
- Entertainment
- Sports
- Money & Business
- Style & Beauty
- Food
- Travel & Regional
- Health
- Home & Garden
- Science & Tech
- Cars
- Hobbies
- Men’s Lifestyle
- Women’s Lifestyle
- Outdoors
- Kids & Parenting
- New Titles
