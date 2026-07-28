import Hero from '@/components/Hero';
import { SpineMobile } from '@/components/PisteSpine';
import RoomBand from '@/components/home/RoomBand';
import CoachSection from '@/components/home/CoachSection';
import AboutFencing from '@/components/home/AboutFencing';
import ClassSection from '@/components/home/ClassSection';
import ReviewWall from '@/components/ReviewWall';
import Pricing from '@/components/home/Pricing';
import TheWeek from '@/components/home/TheWeek';
import PhotoGrid from '@/components/home/PhotoGrid';
import TrialSignUp from '@/components/home/TrialSignUp';
import ComeAndFindUs from '@/components/home/ComeAndFindUs';

export default function Home() {
  return (
    <>
      {/* Mobile top progress hairline. The desktop table-of-contents spine was
          removed — every band now carries its own index label instead. */}
      <SpineMobile />

      {/* Movement 1 · Hero video */}
      <Hero />

      {/* Movement 2 · About the club — the room, the flags, the credibility */}
      <RoomBand />
      <CoachSection />

      {/* Movement 3 · About fencing — what the sport actually IS and DOES */}
      <AboutFencing />

      {/* Movement 4 · What a class looks like */}
      <ClassSection />

      {/* Movement 5 · Reviews immediately BEFORE pricing. A parent reads five
          other parents say the coaching is good, then sees $100 for the intro
          course. That ordering does real work. */}
      <ReviewWall />

      {/* Movement 6 · Pricing summary */}
      <Pricing />

      {/* Movement 7 · The schedule + the open-now indicator */}
      <TheWeek />

      {/* Movement 8 · Real photography of the members */}
      <PhotoGrid />

      {/* Movement 9 · The conversion band — sign up for a trial class */}
      <TrialSignUp />

      {/* Movement 10 · Address and map close */}
      <ComeAndFindUs />
    </>
  );
}
