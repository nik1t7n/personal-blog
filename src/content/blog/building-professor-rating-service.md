---
title: "How I Built a Professor Rating Service for My University"
description: "The story of creating an anonymous professor review platform from scratch, handling 600+ students, and iterating based on real user feedback"
pubDate: 2025-11-28
author: "Nikita Nosov"
tags: ["project", "development"]
---

In my university, there's a general group chat with students from all years. During registration period, students constantly ask for reviews about professors, other students respond, and this cycle repeats every single registration. At one point, I had an idea: **why not create a service that allows students to anonymously leave reviews for professors?** Something clicked. It was like a lightning bolt. An impulse. I got incredibly motivated to build something like this.

It was Sunday morning, around 6-7 AM. I sat down in the kitchen and started researching existing alternatives. I found **ratemyprofessors.com**. Obviously, my university wasn't on there, and honestly, nobody wanted to deal with that platform anyway. I quickly studied the key functionality on that site, wrote down the core features, and started planning.

## The Planning Phase

I immediately understood that if the service is anonymous, I would face many problems with users themselves. **"How to prevent spamming?"**, **"How to moderate the site?"**, **"How to protect against review bombing?"** and so on. I started planning and developed a basic MVP-like functionality.

According to my design:
- Users could add professors themselves
- They could also add reviews themselves
- I designed a system for **merging professor duplicates** — if users create 2 identical professors, I could merge them without losing reviews from either

I also faced the problem of **user identification**. How to do this without registration? I came up with the idea of a **fingerprint hash** based on multiple available browser, network, and device parameters. This approach allowed me to at least somehow identify unique users. For each fingerprint, I set up **rate limits** for basic protection against spam and bombing.

For reviews, I implemented protection against basic insults and profanity. When creating a professor, there was **fuzzy search** that could suggest to the user that such a professor already exists.

## Development Sprint

It took me about **3-4 days** to develop. After four days of intense development, planning, and testing — **D-day arrived**. In the morning, I posted the site in my classmates' group, and we started testing it in production. Everything looked good, and by afternoon I posted it in the general student group with **1200+ people**.

**It was an explosion.** I think I hit a pain point, because the response was instant, strong, and extremely positive. Within a few hours, the site was visited by more than half of the university's students, who were also actively creating reviews.

## First Problems

### The Professor Database
I thought: yes, of course, users can create professors themselves, but it's better to help them. So I **scraped all professors from the university website**, created canonical names for them, and loaded them into the database. This way, I covered **95% of all professors** and avoided problems with duplicates and administering user-created entries.

### The "Smart Guys"
The next mini-problem was "smart guys" trying to create professors and reviews with content like `<script>alert("vibe")</script>`, or `"DROP DATABASE professors"` and so on. I don't know what they were hoping for, but such childish pranks are automatically blocked at the framework level. The only thing they accomplish is creating minor inconveniences. Thank God, there weren't many of them. My rate-limit blocked their path, and their traces were cleaned up by the admin (me). I anticipated this would happen, so I took care of a **convenient and multifunctional admin panel** that allows quick cleanup of such content.

Also, the service has a **flag system** for reviews (inappropriate and fake). So users themselves helped me track down the bad actors.

### Murphy's Law
And the saddest part: on the day I released the site to the public — **Cloudflare went down worldwide** (and my site consequently too). People were writing to me that nothing works, and I had to explain to them that nothing works for everyone in the whole world. Murphy's law :)

## Overcoming Challenges

Nevertheless, I successfully dealt with the first difficulties and we moved forward. What's next? Next came a bunch of bugs and **user bug reports** (huge thanks to them for feedback). I tried to fix them on the fly until I accidentally broke the prod haha.

The next stage of product development was a **test environment**. I set up **staging and production environments** to safely ship new features.

People wrote me their wishes — I implemented them.

Then I added another developer to the project — **my good friend**, who now helps me with development.

## Major Updates

After receiving a lot of useful feedback from users, we started adding big and very useful new features:

### Update #1: Reddit-Style Voting System

We rolled out an update:

- Added a **Reddit-like rating system**. Now each review can receive an upvote 👍 or downvote 👎
- Reviews can now be filtered by categories:
  - **🏆 Top Voted** (most positively liked)
  - **🔥 Hot** (most popular reviews recently by ratings)
  - **🍆 Controversial** (reviews where the ratio between upvotes and downvotes is as close as possible)

### Update #2: Security & UX Improvements

Then we came with another update:

- **🤖 Bot Protection**: Added CAPTCHA on all forms (reviews, voting, adding professors) to prevent spam and mass fake reviews
- **🩸 Professor Details**: Now each professor's page displays their university email addresses and list of courses they teach — just click the details button or professor name in the card
- **⭐️ Improved Rating System**: Professors with less than 5 reviews now show "N/A" instead of a rating and automatically drop to the bottom of the list to avoid misleading ratings
- **👨‍💻 UX Improvements**: Filters, search, and review page states now persist when leaving and returning to the page
- **🎨 Design Polish**: Improved design, animations, and mobile device adaptation for more comfortable use

## The Grind

I responded to messages, bugs, suggestions, and overall feedback from every user. And then we implemented valid suggestions from people.

We **manually collected university emails** for each professor — there are more than 150 of them (since the script helped very little).

Then we implemented **Turnstile CAPTCHA** on the most important and abuse-prone forms. Thereby preventing mass bombing and spamming on the site.

We sat for days developing new updates and fixing bugs — to make the **user experience better** and the service **more reliable and secure**!

## What's Next?

Today, the service has grown beyond my initial expectations. We now have **650+ reviews**, and **350+ students** visit the platform daily — leaving reviews, submitting reports, and voting with upvotes and downvotes. And this is just the beginning.

What's next? Further development and integration. The plan is to complete 2 more major tasks that solve 2 big problems (which ones — I might tell you later). And then, we need to increase user retention time on the service, add features that help in other areas of learning.

Overall, the plan is to **expand this service from a private solution** for the review problem to a **large-scale platform** to help students with learning, with global integrations with educational systems and the university (if we're lucky ^_^)!

---

## Lessons I'm Learning

This project **continues to teach me** invaluable lessons every day:

**Don't overthink ideas.** I could have spent weeks planning the perfect architecture, the perfect feature set, the perfect design. Instead, I shipped a working MVP in 4 days. That decision made all the difference.

**Don't aim for perfection upfront.** Trying to make everything perfect before launch is a recipe for never launching at all. Ship a rough but functional version, then iterate.

**Build in public, iterate based on feedback.** The best features came from user suggestions, not my initial plans. Create hypotheses for features, validate them with real users, and implement the ones that actually matter.

**Solve real problems for real people.** The explosive response taught me that product-market fit isn't theoretical — when you hit a real pain point, people will find you.

This project is my ongoing lesson of shipping fast, learning faster, and building something that actually matters to people.
