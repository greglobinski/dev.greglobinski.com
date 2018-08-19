---
title: Setup Algolia account for your GatsbyJS blog
relatesTo: ['gatsby-starter-personal-blog']
category: instruction
cover: algolia-sign-up.png
---

As I wrote in the [Starter Instalation](/install-blog-starter/) post the starter needs access data to your [Algolia](https://www.algolia.com/) account.

If you do not have an Algolia account yet you have to [sign up](https://www.algolia.com/users/sign_up) now.

If you already have an account go and open the [Apps](https://www.algolia.com/manage/applications) page and click the **NEW APPLICATION** button.

![Algolia - Apps](./algolia-apps.png)

Set the name of the new app and choose plan for it.

![Algolia - create new app](./algolia-create-app.png)

Then choose a region.

![Algolia - choose a region for the app](./algolia-new-app-region.png)

Your app is ready to use.

![Algolia - app dashboard](./algolia-new-app.png)

Now it's time to create an index. Open Indices section. And click the **ADD NEW INDEX** button.

![Algolia - indices](./algolia-no-indices.png)

Set a name for the index.

![Algolia - create index](./algolia-create-index.png)

That's it. You've set everything what you need to setup the starter's searching feature.

![Algolia - new index](./algolia-indices.png)

The final step. Open **Api Keys** section.

![Algolia - Api Keys](./algolia-api-keys.png)

And copy **Application ID**, **Search-Only API Key** and **Admin API Key** and put them together with the **Index's name** into the `.env` file described in the [Starter Instalation](/install-personal-blog-starter/) post.

More info about the searching feature in the following post. Stay tuned. If you have any question use the Comment form below.
