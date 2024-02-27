
## Erik Kimsey
## GLTEngage UI Engineer Technical Challenge

Hello Andy and Aliaks!
How are you?
There was a 2-3 hour limit that I inadvertently surpassed, spending a lot of time simply reading about things like the Media Recorder/Stream API, learning about datatypes, and making decisions regarding persisting data (locally and hosted DB). 

I've decided on Nextjs for frontend framework.  The issue there was MediaRecorder required the "window" object, of the browser, in order to work.  Taillwind for styling.  After deliberation on persisting data, I would have implemented localstorage or IndexedDB.  As for backend, I was planning to host video data on Supabase.

Thanks!
Erik Kimsey

### UI
**Tools used (or potentially used):**

• Nextjs
• Material UI (icons and components)
• Tailwind CSS
• Context API
• MediaRecorder API


### Core Functionality

MediaRecorder API / MediaStream API, via ["Webcam-React" npm package](https://www.npmjs.com/package/react-webcam)


> MediaRecorder API / MediaStream API -vs- Nextjs: 
> <ul>
> <li>given that these APIs cannot function without first accessing the browser engine, consideration for SSR apps (e.g., Nextjs) is required.  </li> 
> <li>file-type download: mimetype (file-type and codec) options / limitations should be considered.  </li>
> <li>[MDN API file format docs: ](https://developer.mozilla.org/en-US/docs/Web/Media/Formats) </li>
> </ul> 


### Persistence / Backend:
<ul>
<li>Localstorage or IndexedDB.</li>
<li>Supabase (PostgreSQL, "firebase alternative")</li>
<li>it came down to localstorage or SQLite.  But, given I intended to solely persist a new performance recording, I opted for localstorage or IndexedDB.</li>
<li>For a database, given the context of: a. the time-limit of this exercise and b. ease of implementation with Nextjs, I opted to use [Supabase ](https://supabase.com).</li>
</ul>


## NEXT STEPS:
#### 1. Finish state management on frontend. i.e.:
#### <ul>
#### <li>create functionality to push new recording data (recording title, recording blob, timestamp) from the NewPerformance component to Context state</li>
#### <li>subsequently, create functionality that triggers API call to post new recording data to DB. </li>
#### <li>REST call to pull user's updated/previous recordings </li>
#### <li> ... </li>
#### </ul>


### 2. Clean-up / complete the UI DOM and styles. Therein:
#### <ul>
#### <li> Finish component above the prev-recordings list, that would house the "Create new Performance" components</li>
#### <li>Implement the "NewPerformance" component in a modal(?).</li>
#### <li>Replace all non-styled components with Material UI (ie, icons, buttons)</li>
#### <li>Provide a placeholder image for NewPerformance video component.</li>
### <li> ... </li>
#### </ul>


### 3. Other frontend:
#### <ul>
#### <li>Finish setting up dynamic state (i.e., via Context API) in all components (e.g., previous recording list-items: title, data, video thumbnail, video duration, and connect items' play/edit/delete buttons to subsequent functionality)</li>
#### <li> ... </li>
#### </ul>


### 4. Backend:
#### <ul>
#### <li>Test saving a new Performance to localstorage.  If localstorage is an issue, test IndexedDB.</li>
#### <li>Supabase... create tables, setup env variables, etc</li>
#### <li> Connect and Test API calls work properly from frontend </li>
#### </ul>

### Surely, I'm forgetting about out other "next steps".

#### How to run this mess:
```bash
npm install
# then
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
 
 
