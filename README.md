Next, Typescript, Partykit.

Simple app demoing Partykit. Create a multiplayer session and open multiple browsers to collaborate on sticky notes in realtime.

Add and delete notes, then edit and move them around.

My code is definitely far from clean (especially with the random .ts files sprinkled in that I grabbed from another project lol) and it has pretty limited styling but was happy to get this working! Most of the relevant stuff is in the boxgame page and box component, and for the party server check out boxes.js.

Stateful session with storage to save notes across sessions.

https://partykit-test.vercel.app/boxgame

To clone repo

npm install

add .env.local and in that file add NEXT_PUBLIC_PARTYKIT_HOST="localhost:1999"

npm run dev

npx partykit dev

open localhost:3000
