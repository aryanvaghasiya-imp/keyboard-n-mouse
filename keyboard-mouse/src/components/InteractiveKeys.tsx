import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface KeyInfo {
  key: string;
  label: string;
  description: string;
  usage: string;
  example: string;
  icon: string;
}

const gamingKeys: KeyInfo[] = [
  // Movement Keys
  {
    key: "W",
    label: "Move Forward",
    description: "Drive forward in vehicles or walk forward on foot",
    usage: "Hold W to accelerate cars or move your character forward",
    example:
      "In GTA 5: Hold W to speed through Los Santos streets or chase enemies! Perfect for escaping after heists! 🚗💨",
    icon: "🚗",
  },
  {
    key: "A",
    label: "Move Left / Steer Left",
    description: "Steer left in vehicles or strafe left on foot",
    usage: "Hold A while driving to turn left, or strafe left while shooting",
    example:
      "GTA 5: Sharp left turns during police chases! Or sidestep while in gunfights to avoid bullets! 🔫",
    icon: "↩️",
  },
  {
    key: "S",
    label: "Move Backward / Brake",
    description: "Reverse in vehicles or move backward on foot",
    usage: "Hold S to brake/reverse cars or back away from danger",
    example:
      "GTA 5: Reverse out of tight parking spots or back away from explosions during missions! 💥",
    icon: "🚕",
  },
  {
    key: "D",
    label: "Move Right / Steer Right",
    description: "Steer right in vehicles or strafe right on foot",
    usage: "Hold D while driving to turn right, or dodge right in combat",
    example:
      "GTA 5: Navigate through traffic or dodge enemy fire by strafing right during shootouts! 🎯",
    icon: "↪️",
  },
  // Action Keys
  {
    key: "SPACE",
    label: "Handbrake / Jump",
    description: "Use handbrake in vehicles or jump on foot",
    usage: "Tap Space for sharp turns or hold to jump over obstacles",
    example:
      "GTA 5: Drift around corners during getaways! Or jump over fences when escaping cops on foot! 🚓",
    icon: "💨",
  },
  {
    key: "SHIFT",
    label: "Sprint / Boost",
    description: "Sprint on foot or turbo boost in vehicles",
    usage: "Hold Shift to run faster or activate vehicle boost",
    example:
      "GTA 5: Sprint away from crime scenes or use nitrous boost during street races! Essential for quick escapes! 🏃‍♀️⚡",
    icon: "⚡",
  },
  {
    key: "CTRL",
    label: "Crouch / Duck",
    description: "Take cover behind objects or duck in vehicles",
    usage: "Hold Ctrl to crouch behind walls or duck while driving",
    example:
      "GTA 5: Hide behind cars during shootouts or duck while driving to avoid headshots! Stay alive longer! 🛡️",
    icon: "🛡️",
  },
  {
    key: "E",
    label: "Enter/Exit Vehicle",
    description: "Get in/out of cars, interact with objects, enter buildings",
    usage: "Press E near vehicles or interactive objects",
    example:
      "GTA 5: Steal cars for getaways, enter buildings for missions, or interact with NPCs! Your key to everything! 🚪",
    icon: "🚪",
  },
  {
    key: "Q",
    label: "Take Cover",
    description: "Take cover behind walls and objects during combat",
    usage: "Press Q near walls to automatically take cover",
    example:
      "GTA 5: Essential for surviving gang wars! Take cover behind walls during missions and pop out to shoot! 🧱",
    icon: "🧱",
  },
  {
    key: "R",
    label: "Reload",
    description: "Reload your current weapon",
    usage: "Press R to reload your weapon with fresh ammo",
    example:
      "GTA 5: Reload between firefights! Never get caught with an empty gun during intense police chases! 🔫",
    icon: "🔄",
  },
  // Number Keys for Weapons
  {
    key: "1",
    label: "Weapon Slot 1",
    description: "Select your primary weapon (usually melee)",
    usage: "Press 1 to quickly switch to your first weapon",
    example:
      "GTA 5: Quick access to your knife or baseball bat for silent takedowns! Perfect for stealth missions! 🔪",
    icon: "🔪",
  },
  {
    key: "2",
    label: "Weapon Slot 2",
    description: "Select your secondary weapon (usually pistol)",
    usage: "Press 2 to switch to your sidearm",
    example:
      "GTA 5: Your trusty pistol for close encounters! Great for quick draws in tight situations! 🔫",
    icon: "🔫",
  },
  {
    key: "3",
    label: "Weapon Slot 3",
    description: "Select assault rifles or SMGs",
    usage: "Press 3 for your main automatic weapon",
    example:
      "GTA 5: AK-47 or SMG for intense firefights! Your go-to for taking down multiple enemies! 🏃‍♂️💥",
    icon: "🔫",
  },
  {
    key: "4",
    label: "Weapon Slot 4",
    description: "Select heavy weapons (rockets, grenades)",
    usage: "Press 4 for explosive weapons",
    example:
      "GTA 5: RPG for helicopters or grenade launcher for groups! Destroy everything in your path! 💣",
    icon: "💣",
  },
  {
    key: "5",
    label: "Weapon Slot 5",
    description: "Select sniper rifles",
    usage: "Press 5 for long-range precision weapons",
    example:
      "GTA 5: Take out enemies from distance! Perfect for rooftop missions and long-range assassinations! 🎯",
    icon: "🎯",
  },
  // Mouse Controls
  {
    key: "LEFT_CLICK",
    label: "Primary Fire / Action",
    description: "Shoot weapons, punch, or primary action",
    usage: "Click to fire your weapon or interact",
    example:
      "GTA 5: Your main attack! Fire guns, throw punches, or honk car horns! Essential for all combat! 💥",
    icon: "👊",
  },
  {
    key: "RIGHT_CLICK",
    label: "Aim / Block / Secondary Action",
    description: "Aim down sights or block attacks or perform secondary action",
    usage: "Hold right-click to aim precisely or block",
    example:
      "GTA 5: Aim for headshots and precision! Hold to steady your aim for perfect shots during shootouts! 🎯",
    icon: "🎯",
  },
  {
    key: "SCROLL_UP",
    label: "Next Weapon / Scroll Up",
    description: "Cycle to next weapon in inventory or scroll up the UI / map",
    usage: "Scroll up to switch to next weapon or move UI up",
    example:
      "GTA 5: Quickly cycle through your arsenal! Switch from pistol to rifle in seconds during combat! ⬆️",
    icon: "⬆️",
  },
  {
    key: "SCROLL_DOWN",
    label: "Previous Weapon / Scroll Down",
    description: "Cycle to previous weapon in inventory or scroll down UI",
    usage: "Scroll down to go back to previous weapon or navigate UI down",
    example:
      "GTA 5: Go back to your preferred weapon! Quick weapon switching can save your life in firefights! ⬇️",
    icon: "⬇️",
  },
  {
    key: "MOUSE_FORWARD",
    label: "Side Button Forward",
    description:
      "Forward button on the side of the mouse (navigate forward / custom action)",
    usage:
      "Press side-forward to go forward in menus or bind to a useful in-game action",
    example:
      "GTA 5: Use the forward side button to quickly throw grenades or cycle through scopes! 🔄",
    icon: "➡️",
  },
  {
    key: "MOUSE_BACKWARD",
    label: "Side Button Backward",
    description:
      "Backward button on the side of the mouse (navigate back / custom action)",
    usage:
      "Press side-backward to go back in menus or bind to melee / toggle UI",
    example:
      "GTA 5: Use the back side button to switch to melee quickly or open your map toggle! 🔙",
    icon: "⬅️",
  },
  {
    key: "DPI_SWITCH",
    label: "DPI / Precision Switch",
    description: "Change mouse sensitivity on the fly",
    usage: "Press the DPI button to toggle between accuracy modes",
    example:
      "GTA 5: When sniping from distance, lower DPI for precision; in close fights, switch it for faster turning! 🎯",
    icon: "🔍",
  },
];

export const InteractiveKeys = () => {
  const [selectedKey, setSelectedKey] = useState<KeyInfo | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const handleKeyClick = (keyInfo: KeyInfo) => {
    setSelectedKey(keyInfo);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background-secondary/50 to-background">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl lg:text-6xl font-orbitron font-black text-glow mb-6">
            Master <span className="text-accent-glow">GTA 5</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From zero to big lady mafia (mera chhota don😈)!! <br />
            🎮👑
          </p>
          <p className="text-lg text-accent mt-4">
            💡 Perfect your driving, shooting, and survival skills!
          </p>
        </div>

        {/* Interactive Keyboard Layout */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Number Keys Row */}
          <div className="text-center">
            <h3 className="text-lg font-orbitron text-accent mb-4">
              🔢 Weapon Selection
            </h3>
            <div className="flex justify-center mb-4">
              <div className="grid grid-cols-10 gap-2">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map(
                  (key) => {
                    const keyInfo = gamingKeys.find((k) => k.key === key);
                    const isGamingKey = !!keyInfo;

                    return (
                      <button
                        key={key}
                        className={`
                        w-12 h-12 lg:w-16 lg:h-16 gaming-key text-sm lg:text-lg
                        ${
                          isGamingKey
                            ? "cursor-pointer hover:scale-105 transform-gpu"
                            : "opacity-30 cursor-not-allowed"
                        }
                        ${hoveredKey === key ? "active" : ""}
                        transition-transform duration-200 ease-out will-change-transform
                      `}
                        onMouseEnter={() => isGamingKey && setHoveredKey(key)}
                        onMouseLeave={() => setHoveredKey(null)}
                        onClick={() => keyInfo && handleKeyClick(keyInfo)}
                        disabled={!isGamingKey}
                      >
                        {key}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          </div>

          {/* WASD Keys */}
          <div className="text-center">
            <h3 className="text-lg font-orbitron text-accent mb-4">
              🎮 Movement Controls
            </h3>
            {/* Row 1 */}
            <div className="flex justify-center mb-4">
              <div className="grid grid-cols-10 gap-2">
                {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map(
                  (key) => {
                    const keyInfo = gamingKeys.find((k) => k.key === key);
                    const isGamingKey = !!keyInfo;

                    return (
                      <button
                        key={key}
                        className={`
                        w-12 h-12 lg:w-16 lg:h-16 gaming-key text-sm lg:text-lg
                        ${
                          isGamingKey
                            ? "cursor-pointer hover:scale-105 transform-gpu"
                            : "opacity-30 cursor-not-allowed"
                        }
                        ${hoveredKey === key ? "active" : ""}
                        transition-transform duration-200 ease-out will-change-transform
                      `}
                        onMouseEnter={() => isGamingKey && setHoveredKey(key)}
                        onMouseLeave={() => setHoveredKey(null)}
                        onClick={() => keyInfo && handleKeyClick(keyInfo)}
                        disabled={!isGamingKey}
                      >
                        {key}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex justify-center mb-4">
              <div className="grid grid-cols-9 gap-2 ml-6">
                {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => {
                  const keyInfo = gamingKeys.find((k) => k.key === key);
                  const isGamingKey = !!keyInfo;

                  return (
                    <button
                      key={key}
                      className={`
                      w-12 h-12 lg:w-16 lg:h-16 gaming-key text-sm lg:text-lg
                      ${
                        isGamingKey
                          ? "cursor-pointer hover:scale-105 transform-gpu"
                          : "opacity-30 cursor-not-allowed"
                      }
                      ${hoveredKey === key ? "active" : ""}
                      transition-transform duration-200 ease-out will-change-transform
                    `}
                      onMouseEnter={() => isGamingKey && setHoveredKey(key)}
                      onMouseLeave={() => setHoveredKey(null)}
                      onClick={() => keyInfo && handleKeyClick(keyInfo)}
                      disabled={!isGamingKey}
                    >
                      {key}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex justify-center mb-6">
              <div className="flex gap-2 items-center">
                <button
                  className="w-16 h-12 lg:w-20 lg:h-16 gaming-key text-xs lg:text-sm cursor-pointer hover:scale-105 transform-gpu transition-transform duration-200 ease-out will-change-transform"
                  onMouseEnter={() => setHoveredKey("SHIFT")}
                  onMouseLeave={() => setHoveredKey(null)}
                  onClick={() =>
                    handleKeyClick(gamingKeys.find((k) => k.key === "SHIFT")!)
                  }
                >
                  SHIFT
                </button>
                <div className="grid grid-cols-7 gap-2">
                  {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
                    <button
                      key={key}
                      className="w-12 h-12 lg:w-16 lg:h-16 gaming-key text-sm lg:text-lg opacity-30 cursor-not-allowed"
                      disabled
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Space Bar and Control Keys */}
            <div className="flex justify-center gap-2 mb-8">
              <button
                className="w-16 h-12 lg:w-20 lg:h-16 gaming-key text-xs lg:text-sm cursor-pointer hover:scale-105 transform-gpu transition-transform duration-200 ease-out will-change-transform"
                onMouseEnter={() => setHoveredKey("CTRL")}
                onMouseLeave={() => setHoveredKey(null)}
                onClick={() =>
                  handleKeyClick(gamingKeys.find((k) => k.key === "CTRL")!)
                }
              >
                CTRL
              </button>
              <button
                className="w-32 h-12 lg:w-48 lg:h-16 gaming-key text-xs lg:text-sm cursor-pointer hover:scale-105 transform-gpu transition-transform duration-200 ease-out will-change-transform"
                onMouseEnter={() => setHoveredKey("SPACE")}
                onMouseLeave={() => setHoveredKey(null)}
                onClick={() =>
                  handleKeyClick(gamingKeys.find((k) => k.key === "SPACE")!)
                }
              >
                SPACE
              </button>
            </div>

            {/* Mouse Controls */}
            <div className="text-center">
              <h3 className="text-lg font-orbitron text-accent mb-6">
                🖱️ Mouse Controls
              </h3>

              {/* Main row (Left, Scroll, Right) */}
              <div className="flex justify-center items-center gap-8">
                {/* Left Click */}
                <button
                  className="w-20 h-16 lg:w-24 lg:h-20 gaming-key text-xs lg:text-sm cursor-pointer hover:scale-105 transform-gpu transition-transform duration-200 ease-out will-change-transform flex flex-col items-center justify-center"
                  onMouseEnter={() => setHoveredKey("LEFT_CLICK")}
                  onMouseLeave={() => setHoveredKey(null)}
                  onClick={() =>
                    handleKeyClick(
                      gamingKeys.find((k) => k.key === "LEFT_CLICK")!
                    )
                  }
                >
                  <span className="text-lg">L</span>
                  <span className="text-xs">CLICK</span>
                </button>

                {/* Scroll Wheel */}
                <div className="flex flex-col gap-2">
                  <button
                    className="w-16 h-12 lg:w-20 lg:h-16 gaming-key text-xs cursor-pointer hover:scale-105 transform-gpu transition-transform duration-200 ease-out will-change-transform"
                    onMouseEnter={() => setHoveredKey("SCROLL_UP")}
                    onMouseLeave={() => setHoveredKey(null)}
                    onClick={() =>
                      handleKeyClick(
                        gamingKeys.find((k) => k.key === "SCROLL_UP")!
                      )
                    }
                  >
                    ↑ SCROLL
                  </button>
                  <button
                    className="w-16 h-12 lg:w-20 lg:h-16 gaming-key text-xs cursor-pointer hover:scale-105 transform-gpu transition-transform duration-200 ease-out will-change-transform"
                    onMouseEnter={() => setHoveredKey("SCROLL_DOWN")}
                    onMouseLeave={() => setHoveredKey(null)}
                    onClick={() =>
                      handleKeyClick(
                        gamingKeys.find((k) => k.key === "SCROLL_DOWN")!
                      )
                    }
                  >
                    ↓ SCROLL
                  </button>
                </div>

                {/* Right Click */}
                <button
                  className="w-20 h-16 lg:w-24 lg:h-20 gaming-key text-xs lg:text-sm cursor-pointer hover:scale-105 transform-gpu transition-transform duration-200 ease-out will-change-transform flex flex-col items-center justify-center"
                  onMouseEnter={() => setHoveredKey("RIGHT_CLICK")}
                  onMouseLeave={() => setHoveredKey(null)}
                  onClick={() =>
                    handleKeyClick(
                      gamingKeys.find((k) => k.key === "RIGHT_CLICK")!
                    )
                  }
                >
                  <span className="text-lg">R</span>
                  <span className="text-xs">CLICK</span>
                </button>
              </div>

              {/* Extra row for Side + DPI */}
              <div className="flex justify-center items-center gap-6 mt-6">
                {/* Side Backward */}
                <button
                  className="w-20 h-14 lg:w-24 lg:h-16 gaming-key text-xs cursor-pointer hover:scale-105 transform-gpu transition-transform duration-200 ease-out will-change-transform flex flex-col items-center justify-center"
                  onMouseEnter={() => setHoveredKey("MOUSE_BACKWARD")}
                  onMouseLeave={() => setHoveredKey(null)}
                  onClick={() =>
                    handleKeyClick(
                      gamingKeys.find((k) => k.key === "MOUSE_BACKWARD")!
                    )
                  }
                >
                  <span className="text-xs">SIDE</span>
                  <span className="text-sm">◀ BACK</span>
                </button>

                {/* DPI Switch */}
                <button
                  className="w-20 h-14 lg:w-24 lg:h-16 gaming-key text-xs cursor-pointer hover:scale-105 transform-gpu transition-transform duration-200 ease-out will-change-transform flex flex-col items-center justify-center"
                  onMouseEnter={() => setHoveredKey("DPI_SWITCH")}
                  onMouseLeave={() => setHoveredKey(null)}
                  onClick={() =>
                    handleKeyClick(
                      gamingKeys.find((k) => k.key === "DPI_SWITCH")!
                    )
                  }
                >
                  <span className="text-sm">DPI</span>
                  <span className="text-xs">SWITCH</span>
                </button>

                {/* Side Forward */}
                <button
                  className="w-20 h-14 lg:w-24 lg:h-16 gaming-key text-xs cursor-pointer hover:scale-105 transform-gpu transition-transform duration-200 ease-out will-change-transform flex flex-col items-center justify-center"
                  onMouseEnter={() => setHoveredKey("MOUSE_FORWARD")}
                  onMouseLeave={() => setHoveredKey(null)}
                  onClick={() =>
                    handleKeyClick(
                      gamingKeys.find((k) => k.key === "MOUSE_FORWARD")!
                    )
                  }
                >
                  <span className="text-xs">SIDE</span>
                  <span className="text-sm">FWD ▶</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Gaming Tips */}
        <div className="text-center mt-12 animate-fadeInUp">
          <p className="text-lg text-accent mb-4">
            🎮 Complete Arsenal: Master keyboard AND mouse for total domination!
          </p>
          <p className="text-muted-foreground">
            Number keys for weapons, <br /> WASD for movement, <br /> mouse for
            precision -<br />
            everything you need to rule Los Santos!! 
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            ⚡ street thug to crime boss~
          </p>
          <p className="text-lg text-accent mt-4">
            Some wishes to my "CHHOTA DON" only
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            ~ dobi, akkalmatthi, aadhi pagal, gadhi, bot sakhii 😏 himmat nhi harni hai abhi bhot aage jana hai ~
            <br/>
            ~ or mehnat karni hai toh ye enjoy karo or link save karke rakho jab bhi kuch aisa lage ake ~
            <br/>
            ~ dekh lena aise hi rahega yee hmmmmmm? ~
          </p>
        </div>
      </div>

      {/* Key Information Modal */}
      <Dialog open={!!selectedKey} onOpenChange={() => setSelectedKey(null)}>
        <DialogContent
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
             max-w-md w-full rounded-xl shadow-xl bg-background p-4 z-50"
        >
          {selectedKey && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-orbitron text-accent-glow flex items-center gap-3">
                  <span className="text-3xl">{selectedKey.icon}</span>
                  {selectedKey.key} - {selectedKey.label}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-foreground/80 leading-relaxed">
                  {selectedKey.description}
                </p>
                <div className="gaming-card p-4 bg-accent/10 border-accent/20">
                  <h4 className="font-orbitron font-semibold text-accent mb-2">
                    How to Use:
                  </h4>
                  <p className="text-sm text-foreground/70">
                    {selectedKey.usage}
                  </p>
                </div>
                <div className="gaming-card p-4 bg-primary/10 border-primary/20">
                  <h4 className="font-orbitron font-semibold text-primary mb-2">
                    Pro Example:
                  </h4>
                  <p className="text-sm text-foreground/70">
                    {selectedKey.example}
                  </p>
                </div>
                <button
                  className="btn-gaming w-full mt-6"
                  onClick={() => setSelectedKey(null)}
                >
                  Got it! 🎮
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
