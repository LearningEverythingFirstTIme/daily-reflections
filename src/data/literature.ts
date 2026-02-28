export interface LiteratureItem {
  id: string;
  title: string;
  content: string;
  category: 'Steps' | 'Traditions' | 'Prayers' | 'Readings';
}

export const literature: LiteratureItem[] = [
  // THE 12 STEPS - SHORT FORM
  {
    id: 'steps-short',
    title: 'The Twelve Steps (Short Form)',
    category: 'Steps',
    content: `1. We admitted we were powerless over alcohol — that our lives had become unmanageable.

2. Came to believe that a Power greater than ourselves could restore us to sanity.

3. Made a decision to turn our will and our lives over to the care of God as we understood Him.

4. Made a searching and fearless moral inventory of ourselves.

5. Admitted to God, to ourselves, and to another human being the exact nature of our wrongs.

6. Were entirely ready to have God remove all these defects of character.

7. Humbly asked Him to remove our shortcomings.

8. Made a list of all persons we had harmed, and became willing to make amends to them all.

9. Made direct amends to such people wherever possible, except when to do so would injure them or others.

10. Continued to take personal inventory and when we were wrong promptly admitted it.

11. Sought through prayer and meditation to improve our conscious contact with God as we understood Him, praying only for knowledge of His will for us and the power to carry that out.

12. Having had a spiritual awakening as the result of these steps, we tried to carry this message to alcoholics, and to practice these principles in all our affairs.`
  },

  // THE 12 STEPS - LONG FORM
  {
    id: 'steps-long',
    title: 'The Twelve Steps (Long Form)',
    category: 'Steps',
    content: `Step One: We admitted we were powerless over alcohol — that our lives had become unmanageable. Who cares to admit complete defeat? Admission of powerlessness is the first step in liberation. Relation of humble kind had always spelled weakness for us. But in A.A. we discovered that humility meant strength.

Step Two: Came to believe that a Power greater than ourselves could restore us to sanity. This was the beginning of the end of isolation. We saw that we could not go it alone. We needed help, and we were ready to accept it.

Step Three: Made a decision to turn our will and our lives over to the care of God as we understood Him. This was the beginning of the practice of the presence of God. We were no longer running the show. We were turning our lives over to the care of a Higher Power.

Step Four: Made a searching and fearless moral inventory of ourselves. We took a good look at ourselves, our assets and liabilities. We faced our past and our present. We were honest with ourselves.

Step Five: Admitted to God, to ourselves, and to another human being the exact nature of our wrongs. We shared our inventory with another person. We were no longer alone with our secrets. We were free.

Step Six: Were entirely ready to have God remove all these defects of character. We became willing to let go of our old ways. We were ready to change.

Step Seven: Humbly asked Him to remove our shortcomings. We asked for help with our character defects. We were willing to grow along spiritual lines.

Step Eight: Made a list of all persons we had harmed, and became willing to make amends to them all. We faced the damage we had done. We became willing to make it right.

Step Nine: Made direct amends to such people wherever possible, except when to do so would injure them or others. We took action to repair the harm we had done. We changed our behavior.

Step Ten: Continued to take personal inventory and when we were wrong promptly admitted it. We maintained our spiritual condition. We kept our side of the street clean.

Step Eleven: Sought through prayer and meditation to improve our conscious contact with God as we understood Him, praying only for knowledge of His will for us and the power to carry that out. We developed a daily spiritual practice. We sought guidance.

Step Twelve: Having had a spiritual awakening as the result of these steps, we tried to carry this message to alcoholics, and to practice these principles in all our affairs. We gave away what was freely given to us. We carried the message to others.`
  },

  // THE 12 TRADITIONS - SHORT FORM
  {
    id: 'traditions-short',
    title: 'The Twelve Traditions (Short Form)',
    category: 'Traditions',
    content: `1. Our common welfare should come first; personal recovery depends upon A.A. unity.

2. For our group purpose there is but one ultimate authority — a loving God as He may express Himself in our group conscience. Our leaders are but trusted servants; they do not govern.

3. The only requirement for A.A. membership is a desire to stop drinking.

4. Each group should be autonomous except in matters affecting other groups or A.A. as a whole.

5. Each group has but one primary purpose — to carry its message to the alcoholic who still suffers.

6. An A.A. group ought never endorse, finance, or lend the A.A. name to any related facility or outside enterprise, lest problems of money, property, and prestige divert us from our primary purpose.

7. Every A.A. group ought to be fully self-supporting, declining outside contributions.

8. Alcoholics Anonymous should remain forever nonprofessional, but our service centers may employ special workers.

9. A.A., as such, ought never be organized; but we may create service boards or committees directly responsible to those they serve.

10. Alcoholics Anonymous has no opinion on outside issues; hence the A.A. name ought never be drawn into public controversy.

11. Our public relations policy is based on attraction rather than promotion; we need always maintain personal anonymity at the level of press, radio, and films.

12. Anonymity is the spiritual foundation of all our Traditions, ever reminding us to place principles before personalities.`
  },

  // THE 12 TRADITIONS - LONG FORM
  {
    id: 'traditions-long',
    title: 'The Twelve Traditions (Long Form)',
    category: 'Traditions',
    content: `One — Our common welfare should come first; personal recovery depends upon A.A. unity.

Two — For our group purpose there is but one ultimate authority — a loving God as He may express Himself in our group conscience. Our leaders are but trusted servants; they do not govern.

Three — The only requirement for A.A. membership is a desire to stop drinking.

Four — Each group should be autonomous except in matters affecting other groups or A.A. as a whole.

Five — Each group has but one primary purpose — to carry its message to the alcoholic who still suffers.

Six — An A.A. group ought never endorse, finance, or lend the A.A. name to any related facility or outside enterprise, lest problems of money, property, and prestige divert us from our primary purpose.

Seven — Every A.A. group ought to be fully self-supporting, declining outside contributions.

Eight — Alcoholics Anonymous should remain forever nonprofessional, but our service centers may employ special workers.

Nine — A.A., as such, ought never be organized; but we may create service boards or committees directly responsible to those they serve.

Ten — Alcoholics Anonymous has no opinion on outside issues; hence the A.A. name ought never be drawn into public controversy.

Eleven — Our public relations policy is based on attraction rather than promotion; we need always maintain personal anonymity at the level of press, radio, and films.

Twelve — Anonymity is the spiritual foundation of all our Traditions, ever reminding us to place principles before personalities.`
  },

  // HOW IT WORKS
  {
    id: 'how-it-works',
    title: 'How It Works',
    category: 'Readings',
    content: `Rarely have we seen a person fail who has thoroughly followed our path. Those who do not recover are people who cannot or will not completely give themselves to this simple program, usually men and women who are constitutionally incapable of being honest with themselves. There are such unfortunates. They are not at fault; they seem to have been born that way. They are naturally incapable of grasping and developing a manner of living which demands rigorous honesty. Their chances are less than average. There are those, too, who suffer from grave emotional and mental disorders, but many of them do recover if they have the capacity to be honest.

Our stories disclose in a general way what we used to be like, what happened, and what we are like now. If you have decided you want what we have and are willing to go to any length to get it — then you are ready to take certain steps.

At some of these we balked. We thought we could find an easier, softer way. But we could not. Half measures availed us nothing. We stood at the turning point. We asked His protection and care with complete abandon.

Here are the steps we took, which are suggested as a program of recovery:

1. We admitted we were powerless over alcohol — that our lives had become unmanageable.
2. Came to believe that a Power greater than ourselves could restore us to sanity.
3. Made a decision to turn our will and our lives over to the care of God as we understood Him.
4. Made a searching and fearless moral inventory of ourselves.
5. Admitted to God, to ourselves, and to another human being the exact nature of our wrongs.
6. Were entirely ready to have God remove all these defects of character.
7. Humbly asked Him to remove our shortcomings.
8. Made a list of all persons we had harmed, and became willing to make amends to them all.
9. Made direct amends to such people wherever possible, except when to do so would injure them or others.
10. Continued to take personal inventory and when we were wrong promptly admitted it.
11. Sought through prayer and meditation to improve our conscious contact with God as we understood Him, praying only for knowledge of His will for us and the power to carry that out.
12. Having had a spiritual awakening as the result of these steps, we tried to carry this message to alcoholics, and to practice these principles in all our affairs.

Many of us exclaimed, "What an order! I can't go through with it." Do not be discouraged. No one among us has been able to maintain anything like perfect adherence to these principles. We are not saints. The point is, that we are willing to grow along spiritual lines. The principles we have set down are guides to progress. We claim spiritual progress rather than spiritual perfection.`
  },

  // THE PROMISES
  {
    id: 'promises',
    title: 'The Promises',
    category: 'Readings',
    content: `If we are painstaking about this phase of our development, we will be amazed before we are half way through. We are going to know a new freedom and a new happiness. We will not regret the past nor wish to shut the door on it. We will comprehend the word serenity and we will know peace. No matter how far down the scale we have gone, we will see how our experience can benefit others. That feeling of uselessness and self-pity will disappear. We will lose interest in selfish things and gain interest in our fellows. Self-seeking will slip away. Our whole attitude and outlook upon life will change. Fear of people and of economic insecurity will leave us. We will intuitively know how to handle situations which used to baffle us. We will suddenly realize that God is doing for us what we could not do for ourselves.

Are these extravagant promises? We think not. They are being fulfilled among us — sometimes quickly, sometimes slowly. They will always materialize if we work for them.`
  },

  // THE PREAMBLE
  {
    id: 'preamble',
    title: 'The Preamble',
    category: 'Readings',
    content: `Alcoholics Anonymous is a fellowship of people who share their experience, strength and hope with each other that they may solve their common problem and help others to recover from alcoholism.

The only requirement for membership is a desire to stop drinking. There are no dues or fees for A.A. membership; we are self-supporting through our own contributions.

A.A. is not allied with any sect, denomination, politics, organization or institution; does not wish to engage in any controversy; neither endorses nor opposes any causes.

Our primary purpose is to stay sober and help other alcoholics to achieve sobriety.`
  },

  // THE RESPONSIBILITY STATEMENT
  {
    id: 'responsibility',
    title: 'The Responsibility Statement',
    category: 'Readings',
    content: `I am Responsible.

When anyone, anywhere, reaches out for help, I want the hand of A.A. always to be there.

And for that: I am responsible.`
  },

  // SERENITY PRAYER
  {
    id: 'serenity',
    title: 'The Serenity Prayer',
    category: 'Prayers',
    content: `God, grant me the serenity to accept the things I cannot change,
the courage to change the things I can,
and the wisdom to know the difference.

Living one day at a time,
enjoying one moment at a time,
accepting hardship as a pathway to peace,
taking, as Jesus did, this sinful world as it is,
not as I would have it,
trusting that You will make all things right,
if I surrender to Your will,
so that I may be reasonably happy in this life,
and supremely happy with You forever in the next.

Amen.`
  },

  // THIRD STEP PRAYER
  {
    id: 'third-step',
    title: 'The Third Step Prayer',
    category: 'Prayers',
    content: `God, I offer myself to Thee —
to build with me and to do with me as Thou wilt.
Relieve me of the bondage of self,
that I may better do Thy will.
Take away my difficulties,
that victory over them may bear witness
to those I would help of Thy Power,
Thy Love, and Thy Way of life.
May I do Thy will always!

Amen.`
  },

  // SEVENTH STEP PRAYER
  {
    id: 'seventh-step',
    title: 'The Seventh Step Prayer',
    category: 'Prayers',
    content: `My Creator, I am now willing that you should have all of me, good and bad.
I pray that you now remove from me every single defect of character
which stands in the way of my usefulness to you and my fellows.
Grant me strength, as I go out from here, to do your bidding.

Amen.`
  },

  // ST. FRANCIS PRAYER (11th Step Prayer)
  {
    id: 'st-francis',
    title: 'The St. Francis Prayer (11th Step Prayer)',
    category: 'Prayers',
    content: `Lord, make me a channel of thy peace,
that where there is hatred, I may bring love;
that where there is wrong, I may bring the spirit of forgiveness;
that where there is discord, I may bring harmony;
that where there is error, I may bring truth;
that where there is doubt, I may bring faith;
that where there is despair, I may bring hope;
that where there are shadows, I may bring light;
that where there is sadness, I may bring joy.

Lord, grant that I may seek rather to comfort than to be comforted;
to understand, than to be understood;
to love, than to be loved.
For it is by self-forgetting that one finds.
It is by forgiving that one is forgiven.
It is by dying that one awakens to Eternal Life.

Amen.`
  },

  // LORD'S PRAYER
  {
    id: 'lords-prayer',
    title: "The Lord's Prayer",
    category: 'Prayers',
    content: `Our Father, who art in heaven,
hallowed be Thy name.
Thy kingdom come,
Thy will be done,
on earth as it is in heaven.
Give us this day our daily bread,
and forgive us our trespasses,
as we forgive those who trespass against us.
And lead us not into temptation,
but deliver us from evil.
For Thine is the kingdom,
and the power,
and the glory,
forever and ever.

Amen.`
  },

  // WHO ARE YOU?
  {
    id: 'who-are-you',
    title: 'Who Are You?',
    category: 'Readings',
    content: `Who are you?

You are a child of God.
You are not your past.
You are not your mistakes.
You are not your shame.
You are not your guilt.
You are not your fear.
You are not your anger.
You are not your resentment.

You are a miracle.
You are a child of God.
You are worthy of love.
You are worthy of forgiveness.
You are worthy of peace.
You are worthy of joy.

You are a member of Alcoholics Anonymous.
You are part of a fellowship that loves you.
You are part of a fellowship that accepts you.
You are part of a fellowship that will never give up on you.

You are a miracle.`
  },

  // JUST FOR TODAY
  {
    id: 'just-for-today',
    title: 'Just For Today',
    category: 'Readings',
    content: `Just for today I will try to live through this day only, and not tackle all my problems at once. I can do something for twelve hours that would appall me if I felt that I had to keep it up for a lifetime.

Just for today I will be happy. This assumes to be true what Abraham Lincoln said, that "Most folks are as happy as they make up their minds to be."

Just for today I will adjust myself to what is, and not try to adjust everything to my own desires. I will take my "luck" as it comes, and fit myself to it.

Just for today I will try to strengthen my mind. I will study. I will learn something useful. I will not be a mental loafer. I will read something that requires effort, thought and concentration.

Just for today I will exercise my soul in three ways: I will do somebody a good turn, and not get found out; if anybody knows of it, it will not count. I will do at least two things I don't want to do — just for exercise. I will not show anyone that my feelings are hurt; they may be hurt, but today I will not show it.

Just for today I will be agreeable. I will look as well as I can, dress becomingly, talk low, act courteously, criticize not one bit, not find fault with anything, and not try to improve or regulate anybody except myself.

Just for today I will have a program. I may not follow it exactly, but I will have it. I will save myself from two pests: hurry and indecision.

Just for today I will have a quiet half hour all by myself, and relax. During this half hour, sometime, I will try to get a better perspective of my life.

Just for today I will be unafraid. Especially I will not be afraid to enjoy what is beautiful, and to believe that as I give to the world, so the world will give to me.`
  },

  // THE UNITY PRAYER
  {
    id: 'unity-prayer',
    title: 'The Unity Prayer',
    category: 'Prayers',
    content: `Dear God,

Please bless our group with unity.
Help us to remember that our primary purpose is to carry the message to the alcoholic who still suffers.
Help us to practice these principles in all our affairs.
Help us to be kind and loving to one another.
Help us to remember that we are all here for the same reason.
We are all alcoholics trying to stay sober one day at a time.

Amen.`
  }
];

export const categories = ['Steps', 'Traditions', 'Prayers', 'Readings'] as const;
export type Category = typeof categories[number];
