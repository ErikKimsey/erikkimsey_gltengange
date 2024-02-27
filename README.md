
## Erik Kimsey
## GLTEngage UI Engineer Technical Challenge


#### UI
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




#### How to run this mess:

```bash
npm install
# then
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
 
 
