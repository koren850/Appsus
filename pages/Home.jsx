export function Home() {
  return (
    <section className="home">
      <h1 className={"home-title  layout-container"}>
        Welcome to <span className={"home-title-a"}> A</span>
        <span className={"home-title-span"}> ppsus</span>
      </h1>
      <h2 className={"home-sub-title"}>
        The most powerfull usefull app at the market
      </h2>
      <p className={"home-p"}>
        here you will be able to travel between your mails, notes and your most
        favorite books. <span>Lets Go !</span>
      </p>
      <main className={"home-apps flex center"}>
        <article className={"home-app-container"}>
          <h4 className={"home-app-title"}>Books</h4>
          <p className={"home-p home-text"}>
            What will you say if someone will tell you that all of your favorite
            books that you collected while the years,can help you make enough
            money to your next trip ! So... It is ! all you need to do is to
            place them at the same place, where you can post them to sell online
            ! And guess what ? you can even add a new book (on real !) and add
            it to your book gallery ! So what are you waiting for ?
          </p>
        </article>

        <article className={"home-app-container"}>
          <h4 className={"home-app-title"}>Notes</h4>
          <p className={"home-p home-text"}>
            Do you remember the last time that you saw somthing that you told
            yourself, Wow.. i most share it with my friends.. but let me guess -
            you forget ! Who does'nt ? Dont worry, that is the exact reason why
            we programmed the amazing Appsus Note app, a place where you can tag
            anything you like, from videoes to pictures, from list for the
            supermarket or even a joke you heared, and whenever you would like
            to share it, you can with a one click button. few of the features
            are includes clone, color changing, tagging a special note and much
            more ! so what are you waiting for ?
          </p>
        </article>

        <article className={"home-app-container"}>
          <h4 className={"home-app-title"}>Mails</h4>
          <p className={"home-p home-text"}>
            Today, when all of the word are looking for the future, the modern
            generation are communicating with each other oftenly online. So
            here, at Appsus Mail you can have your own private mail box, ordered
            when a lot of categories, just write some text and send it to your
            best friends ! simple as that, you can upload your own mails to the
            Appsus Notes... Ready to try? lets Go !
          </p>
        </article>
      </main>
    </section>
  );
}
