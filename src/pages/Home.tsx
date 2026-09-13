import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Clock3, MapPin, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

type MenuItem = {
  id: number | string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl?: string | null;
  badge?: string | null;
};

const seedMenu: MenuItem[] = [
  { id: "crunch", name: "The Crunch", description: "Crispy chicken, slaw, pickles + CHICKS sauce", category: "Sandwiches", price: 149, imageUrl: "/images/crunch.webp", badge: "Fan fav" },
  { id: "double", name: "Double Trouble", description: "Two crunchy fillets, double cheese, extra sauce", category: "Sandwiches", price: 189, imageUrl: "/images/double.webp", badge: "Big energy" },
  { id: "spicy", name: "Spicy Main Character", description: "Hot crispy chicken, jalapeño slaw + fire mayo", category: "Sandwiches", price: 159, imageUrl: "/images/spicy.webp", badge: "Hot" },
  { id: "ranch", name: "Ranch Mood", description: "Crispy chicken, ranch, lettuce + crunchy onions", category: "Sandwiches", price: 154, imageUrl: "/images/ranch.webp" },
  { id: "cheese", name: "Cheese Please", description: "Crispy chicken, cheddar, pickles + cheese sauce", category: "Sandwiches", price: 164, imageUrl: "/images/cheese.webp" },
  { id: "bbq", name: "BBQ After Dark", description: "Crispy chicken, smoky BBQ, slaw + crispy onions", category: "Sandwiches", price: 159, imageUrl: "/images/bbq.webp" },
  { id: "classic", name: "Classic Chick", description: "Golden chicken, lettuce, mayo + pickles", category: "Sandwiches", price: 139, imageUrl: "/images/classic.webp" },
  { id: "melt", name: "Hot Honey Melt", description: "Crispy chicken, melted cheese + hot honey glaze", category: "Sandwiches", price: 169, imageUrl: "/images/melt.webp", badge: "New" },
  { id: "pepper", name: "Pepper Party", description: "Crispy chicken, pepper sauce, lettuce + cheese", category: "Sandwiches", price: 159, imageUrl: "/images/pepper.webp" },
  { id: "tender", name: "Tender Stack", description: "Two chicken tenders, slaw + signature sauce", category: "Sandwiches", price: 149, imageUrl: "/images/tender.webp" },
  { id: "pepperoni", name: "Pepperoni Party", description: "Loaded pepperoni, mozzarella + tomato sauce", category: "Pizza", price: 199, imageUrl: "/images/pepperoni.webp", badge: "New" },
  { id: "chicken-pizza", name: "Chicken Kick", description: "Chicken bites, ranch drizzle, mozzarella + peppers", category: "Pizza", price: 219, imageUrl: "/images/chicken-pizza.webp" },
  { id: "margherita", name: "Cheesy Margherita", description: "Tomato, mozzarella, basil + olive oil", category: "Pizza", price: 169, imageUrl: "/images/margherita.webp" },
  { id: "bbq-pizza", name: "BBQ Chicken Pizza", description: "BBQ chicken, red onion, mozzarella + smoky sauce", category: "Pizza", price: 219, imageUrl: "/images/bbq-pizza.webp" },
  { id: "veggie", name: "Veggie Vibes", description: "Peppers, onions, olives, mushrooms + cheese", category: "Pizza", price: 179, imageUrl: "/images/veggie.webp" },
  { id: "four-cheese", name: "Four Cheese Flex", description: "Mozzarella, cheddar, parmesan + creamy cheese", category: "Pizza", price: 189, imageUrl: "/images/four-cheese.webp" },
  { id: "meat-lovers", name: "Meat Lovers", description: "Pepperoni, beef, sausage, mozzarella + tomato", category: "Pizza", price: 229, imageUrl: "/images/meat-lovers.webp", badge: "Loaded" },
  { id: "buffalo-pizza", name: "Buffalo Chick Pizza", description: "Buffalo chicken, ranch drizzle, red onion + cheese", category: "Pizza", price: 219, imageUrl: "/images/buffalo-pizza.webp" },
  { id: "hawaiian", name: "Hawaiian Heat", description: "Smoky chicken, pineapple, jalapeño + mozzarella", category: "Pizza", price: 209, imageUrl: "/images/hawaiian.webp" },
  { id: "pesto", name: "Green Room", description: "Pesto chicken, tomato, mozzarella + fresh basil", category: "Pizza", price: 219, imageUrl: "/images/pesto.webp" },
  { id: "strips", name: "Strip Show", description: "Five golden chicken strips with dip", category: "Fried Chicken", price: 159, imageUrl: "/images/strips.webp" },
  { id: "wings", name: "Hot Wings", description: "Eight crispy wings tossed in your mood", category: "Fried Chicken", price: 129, imageUrl: "/images/wings.webp" },
  { id: "bucket", name: "The Big Bucket", description: "Four pieces, four strips, fries + three dips", category: "Fried Chicken", price: 399, imageUrl: "/images/bucket.webp", badge: "For sharing" },
  { id: "popcorn", name: "Popcorn Chick", description: "Bite-size crispy chicken with signature dip", category: "Fried Chicken", price: 139, imageUrl: "/images/popcorn.webp" },
  { id: "drumsticks", name: "Golden Drumsticks", description: "Three crispy drumsticks with coleslaw", category: "Fried Chicken", price: 169, imageUrl: "/images/drumsticks.webp" },
  { id: "tenders-box", name: "Tenders Box", description: "Eight tenders, fries, slaw + two dips", category: "Fried Chicken", price: 249, imageUrl: "/images/tenders-box.webp", badge: "Best seller" },
  { id: "fries", name: "Loaded Fries", description: "Skin-on fries, cheese sauce + crispy bits", category: "Sides", price: 79, imageUrl: "/images/fries.webp", badge: "Shareable" },
  { id: "regular-fries", name: "Classic Fries", description: "Golden skin-on fries with CHICKS seasoning", category: "Sides", price: 49, imageUrl: "/images/regular-fries.webp" },
  { id: "wedges", name: "Spicy Wedges", description: "Crispy potato wedges with spicy dip", category: "Sides", price: 69, imageUrl: "/images/wedges.webp" },
  { id: "slaw", name: "Cool Slaw", description: "Creamy, crunchy and made to balance the heat", category: "Sides", price: 49, imageUrl: "/images/slaw.webp" },
  { id: "mozzarella", name: "Mozzarella Sticks", description: "Six cheesy sticks with tomato dip", category: "Sides", price: 89, imageUrl: "/images/mozzarella.webp" },
  { id: "onion-rings", name: "Onion Rings", description: "Crispy golden rings with ranch dip", category: "Sides", price: 69, imageUrl: "/images/onion-rings.webp" },
  { id: "dips", name: "Dip Trio", description: "Choose three: fire, ranch, BBQ or CHICKS sauce", category: "Sides", price: 39, imageUrl: "/images/dips.webp" },
  { id: "corn", name: "Butter Corn", description: "Sweet corn with butter and CHICKS seasoning", category: "Sides", price: 59, imageUrl: "/images/corn.webp" },
  { id: "cola", name: "Cola", description: "Ice-cold 330ml can", category: "Drinks", price: 35, imageUrl: "/images/cola.webp" },
  { id: "lemonade", name: "Fresh Lemonade", description: "Cold, bright and extra refreshing", category: "Drinks", price: 49, imageUrl: "/images/lemonade.webp" },
  { id: "iced-tea", name: "Peach Iced Tea", description: "Sweet peach tea served cold", category: "Drinks", price: 49, imageUrl: "/images/iced-tea.webp" },
  { id: "water", name: "Water", description: "Chilled bottled water", category: "Drinks", price: 20, imageUrl: "/images/water.webp" },
  { id: "orange", name: "Orange Fizz", description: "Bright citrus soda", category: "Drinks", price: 35, imageUrl: "/images/orange.webp" },
  { id: "milkshake", name: "Vanilla Shake", description: "Creamy vanilla milkshake", category: "Drinks", price: 89, imageUrl: "/images/milkshake.webp", badge: "Treat" },
  { id: "brownie", name: "Warm Brownie", description: "Chocolate brownie with a gooey center", category: "Desserts", price: 79, imageUrl: "/images/brownie.webp" },
  { id: "cookies", name: "Cookie Duo", description: "Two warm chocolate chip cookies", category: "Desserts", price: 59, imageUrl: "/images/cookies.webp" },
  { id: "box-for-two", name: "Box For Two", description: "Two sandwiches, fries, two drinks + two dips", category: "Combos", price: 399, imageUrl: "/images/box-for-two.webp", badge: "Good deal" },
  { id: "solo-combo", name: "Solo Combo", description: "Any sandwich, fries + a drink", category: "Combos", price: 219, imageUrl: "/images/solo-combo.webp" },
  { id: "chicken-combo", name: "Chicken Combo", description: "Three strips, fries, slaw + a drink", category: "Combos", price: 229, imageUrl: "/images/chicken-combo.webp" },
];

const categories = ["All", "Sandwiches", "Pizza", "Fried Chicken", "Sides", "Drinks", "Desserts", "Combos"];
const money = (price: number) => `${price} EGP`;

export default function Home() {
  const menu = seedMenu;
  const [category, setCategory] = useState("All");
  const filteredMenu = useMemo(() => category === "All" ? menu : menu.filter(item => item.category === category), [category, menu]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fff8ed] text-[#18222d]">
      <header className="absolute inset-x-0 top-0 z-20 border-b border-white/15 text-white">
        <div className="container flex h-20 items-center justify-between gap-6">
          <a href="#top" className="flex items-center gap-2" aria-label="CHICKS home">
            <span className="font-display text-4xl leading-none tracking-wide text-[#ffdf72]">CHICKS</span>
            <span className="hidden rounded-full bg-[#f0443e] px-2 py-1 text-[10px] font-bold uppercase tracking-[.2em] text-white sm:inline">EST. 2026</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <a className="hover:text-[#ffdf72]" href="#menu">Menu</a>
            <a className="hover:text-[#ffdf72]" href="#story">Why CHICKS</a>
            <a className="hover:text-[#ffdf72]" href="#visit">Find us</a>
          </nav>
          <a href="#menu"><Button className="rounded-full bg-[#ffdf72] px-5 font-bold text-[#18222d] hover:bg-white">View menu</Button></a>
        </div>
      </header>

      <main id="top">
        <section className="hero-grid relative isolate min-h-[680px] overflow-hidden bg-[#641b27] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_30%,rgba(240,68,62,.42),transparent_32%),linear-gradient(110deg,#641b27_0%,#3e1520_100%)]" />
          <div className="container relative z-10 grid min-h-[680px] items-center gap-8 pb-14 pt-28 lg:grid-cols-[.9fr_1.1fr]">
            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ffdf72]/40 bg-[#ffdf72]/10 px-3 py-2 text-xs font-bold uppercase tracking-[.2em] text-[#ffdf72]"><Sparkles className="h-4 w-4" /> New Assiut, you up?</div>
              <h1 className="font-display text-[clamp(5.2rem,13vw,10rem)] leading-[.78] tracking-wide text-[#ffdf72]">BIG<br /><span className="text-white">CRUNCH.</span></h1>
              <p className="mt-8 max-w-md text-lg leading-8 text-white/75">Burgers, pizza, fried chicken and sides made for loud cravings. No boring bites allowed.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#menu"><Button size="lg" className="rounded-full bg-[#f0443e] px-7 font-bold text-white hover:bg-[#ff5b54]">Order the good stuff <ArrowRight className="ml-2 h-4 w-4" /></Button></a>
                <a href="#story"><Button size="lg" variant="outline" className="rounded-full border-white/30 bg-transparent px-7 font-bold text-white hover:bg-white hover:text-[#18222d]">Why CHICKS?</Button></a>
              </div>
              <div className="mt-10 flex flex-wrap gap-5 text-xs font-bold uppercase tracking-[.15em] text-white/55"><span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#ffdf72]" /> Open daily · 11 AM — 2 AM</span><span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#ffdf72]" /> New Assiut City</span></div>
            </div>
            <div className="relative -mr-[20vw] mt-6 lg:mt-20">
              <div className="absolute -left-4 top-10 z-10 rotate-[-8deg] rounded-2xl bg-[#ffdf72] px-4 py-3 font-display text-3xl leading-none text-[#18222d] shadow-pop">CRISPY<br />ENERGY</div>
              <img src="/images/chicks-hero.webp" alt="Crispy fried chicken burger with fries" className="relative w-full max-w-[840px] rounded-[2rem] object-cover shadow-pop-red" />
            </div>
          </div>
        </section>

        <div className="overflow-hidden bg-[#ffdf72] py-4 font-display text-2xl tracking-[.15em] text-[#18222d]"><div className="flex min-w-max items-center gap-8 whitespace-nowrap"><span>CRUNCH LOUD</span><span>✦</span><span>EAT HAPPY</span><span>✦</span><span>NEW ASSIUT CITY</span><span>✦</span><span>CRUNCH LOUD</span><span>✦</span><span>EAT HAPPY</span></div></div>

        <section id="menu" className="container py-24">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="mb-2 text-xs font-bold uppercase tracking-[.25em] text-[#f0443e]">The lineup</p><h2 className="font-display text-6xl leading-none tracking-wide md:text-8xl">Pick your<br /><span className="text-[#f0443e]">main character.</span></h2></div><p className="max-w-xs text-sm leading-6 text-[#6e635a]">A little messy. A lot delicious. Grab a classic or go full chaos.</p></div>
          <div className="mt-10 flex gap-2 overflow-x-auto pb-2">{categories.map(item => <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-bold ${category === item ? "border-[#18222d] bg-[#18222d] text-white" : "border-[#eadbc5] bg-white text-[#6e635a] hover:border-[#f0443e] hover:text-[#f0443e]"}`}>{item}</button>)}</div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filteredMenu.map((item, index) => <article key={item.id} className="group overflow-hidden rounded-[1.4rem] border border-[#eadbc5] bg-white shadow-sm"><div className="relative aspect-[1.15] overflow-hidden bg-[#641b27]"><img src={item.imageUrl || "/images/chicks-burger.webp"} alt={item.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />{item.badge && <span className="absolute left-4 top-4 rounded-full bg-[#ffdf72] px-3 py-1 text-xs font-bold text-[#18222d]">{item.badge}</span>}</div><div className="p-5"><div className="flex items-start justify-between gap-4"><div><h3 className="font-display text-3xl tracking-wide">{item.name}</h3><p className="mt-1 text-sm leading-5 text-[#6e635a]">{item.description}</p></div><span className="shrink-0 rounded-full bg-[#f3e9d9] px-3 py-1 text-sm font-bold">{money(item.price)}</span></div></div></article>)}</div>
        </section>

        <section id="story" className="bg-[#18222d] py-24 text-white"><div className="container grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="mb-3 text-xs font-bold uppercase tracking-[.25em] text-[#ffdf72]">No small energy</p><h2 className="font-display text-7xl leading-[.85] tracking-wide text-[#ffdf72] md:text-9xl">MADE<br /><span className="text-white">TO HIT.</span></h2></div><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-3xl bg-[#f0443e] p-7"><span className="font-display text-5xl">01</span><h3 className="mt-8 text-xl font-bold">Fresh out the fryer</h3><p className="mt-2 text-sm leading-6 text-white/75">Crunchy, saucy and hot enough to make the first bite a whole event.</p></div><div className="rounded-3xl bg-[#ffdf72] p-7 text-[#18222d]"><span className="font-display text-5xl">02</span><h3 className="mt-8 text-xl font-bold">Built for your crew</h3><p className="mt-2 text-sm leading-6 text-[#18222d]/70">Big boxes, shareable sides and zero judgment if you keep the fries.</p></div><div className="rounded-3xl border border-white/15 bg-white/5 p-7 sm:col-span-2"><div className="flex items-center gap-3"><Check className="h-5 w-5 rounded-full bg-[#ffdf72] p-1 text-[#18222d]" /><span className="text-sm font-bold">Made for New Assiut nights</span></div><p className="mt-4 max-w-xl text-sm leading-6 text-white/60">CHICKS is your new local go-to for the cravings that do not wait. Pull up, grab a box, and make the night louder.</p></div></div></div></section>

        <section id="visit" className="container py-24"><div className="rounded-[2rem] bg-[#f3e9d9] p-7 md:p-12"><div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><p className="mb-3 text-xs font-bold uppercase tracking-[.25em] text-[#f0443e]">Pull up</p><h2 className="font-display text-6xl leading-none tracking-wide md:text-8xl">See you<br /><span className="text-[#f0443e]">in the city.</span></h2></div><div className="space-y-3 text-sm"><a
  href="https://maps.app.goo.gl/rriZwVP94LDQgtnx5"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-3 rounded-full bg-[#f0443e] px-5 py-3 font-bold text-white transition hover:bg-[#d93631]"
>
  <MapPin className="h-5 w-5" />
  New Assiut City, Assiut
</a><p className="flex items-center gap-3"><Clock3 className="h-5 w-5 text-[#f0443e]" /> Daily · 11 AM — 2 AM</p><p className="text-[#6e635a]">Phone +20 1130729353</p></div></div></div></section>
      </main>

      <footer className="bg-[#641b27] py-8 text-white"><div className="container flex flex-col justify-between gap-4 text-sm sm:flex-row sm:items-center"><div className="font-display text-3xl tracking-wide text-[#ffdf72]">CHICKS.</div><p className="text-white/50">© 2026 CHICKS New Assiut · Fast food, big energy.</p></div></footer>

    </div>
  );
}
