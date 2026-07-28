import s from './AboutFencing.module.css';

/**
 * "About fencing" — a short explainer for beginners. The point of this section
 * is not to define fencing academically, but to answer the five questions a
 * curious parent silently asks before booking: what actually IS this, does
 * my kid have to be athletic, will they get hurt, what do they learn, and how
 * long until they're any good.
 *
 * Written as a lead paragraph followed by five short qualities. Each quality
 * is one line of body copy, not an icon-card with three-word caption — §5.1
 * prohibits those outright.
 */
const qualities = [
  {
    title: 'Focus.',
    body:
      'A bout is fifteen touches and lasts three minutes at most. Every one demands a plan and a decision. Kids who fence tend to sit still at school.',
  },
  {
    title: 'Discipline.',
    body:
      'You show up, you salute, you shake hands. The etiquette isn’t decoration — it’s how the sport keeps its head under pressure.',
  },
  {
    title: 'Confidence.',
    body:
      'Nobody is naturally good at this. Everyone starts by losing to someone smaller than them, and then figures out how to win.',
  },
  {
    title: 'Strategy.',
    body:
      'It’s often described as physical chess for a reason. Reading the opponent is more than half of it — the blade is the small final step.',
  },
  {
    title: 'Athleticism.',
    body:
      'A single lunge covers eight feet in a fraction of a second. Fencers move like sprinters and boxers, only sideways, and forever.',
  },
];

export default function AboutFencing() {
  return (
    <section
      id="about-fencing"
      className="band band--paper"
      data-reveal
      aria-labelledby="about-fencing-heading"
    >
      <span className="band__rule" aria-hidden="true" />
      <span className="band__index" aria-hidden="true">04 · About fencing</span>

      <div className="container">
        <div className={s.head}>
          <span className="eyebrow">About fencing</span>
          <h2 id="about-fencing-heading" className={`${s.title} t-display-l`}>
            Boxing without the concussions.
          </h2>
          <p className={`${s.lead} t-body-l`}>
            Fencing is a full-contact Olympic sport played with a padded steel
            blade and a mask that stops it. Two people move up and down a strip
            of fourteen metres and try to touch each other with the tip.
            That&rsquo;s the whole game. What builds under it is what actually
            matters.
          </p>
        </div>

        <div className={s.grid}>
          {qualities.map((q, i) => (
            <div key={q.title} className={s.item}>
              <span className={`${s.num} t-utility-sm tnum`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className={`${s.itemTitle} t-display-s`}>{q.title}</h3>
                <p className={`${s.itemBody} t-body`}>{q.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
