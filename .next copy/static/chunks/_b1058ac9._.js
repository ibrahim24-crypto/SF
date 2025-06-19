(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/game/ExplosionEffect.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const ExplosionEffect = ({ color, size })=>{
    const lines = 8;
    const explosionLineLength = size * 1.5; // Make explosion lines a bit larger than the ball
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 flex items-center justify-center pointer-events-none",
        children: Array.from({
            length: lines
        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "explosion-line",
                style: {
                    '--angle': `${360 / lines * i}deg`,
                    '--line-length': `${explosionLineLength}px`,
                    backgroundColor: color === 'rainbow-gradient' ? 'hsl(var(--primary))' : color
                }
            }, i, false, {
                fileName: "[project]/src/components/game/ExplosionEffect.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/game/ExplosionEffect.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
};
_c = ExplosionEffect;
const __TURBOPACK__default__export__ = ExplosionEffect;
var _c;
__turbopack_context__.k.register(_c, "ExplosionEffect");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/game/Ball.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$ExplosionEffect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/game/ExplosionEffect.tsx [app-client] (ecmascript)");
;
;
const BallComponent = ({ id, x, y, radius, color, onBallClick, isExploding })=>{
    const handleClick = (event)=>{
        event.stopPropagation();
        if (!isExploding) {
            onBallClick(id);
        }
    };
    const ballStyle = {
        left: `${x}%`,
        top: `${y}px`,
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        borderRadius: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
        transition: 'top 0.05s linear'
    };
    if (color === 'rainbow-gradient') {
    // Applied via className for animation
    } else {
        ballStyle.backgroundColor = color;
    }
    // The BallComponent itself is removed when isExploding becomes true for a duration,
    // then fully removed from the balls array.
    // The ExplosionEffect is rendered by GameScreen or BallComponent itself during the exploding phase.
    // If BallComponent handles its own explosion rendering:
    if (isExploding) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                left: `${x}%`,
                top: `${y}px`,
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$ExplosionEffect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                color: color,
                size: radius * 2
            }, void 0, false, {
                fileName: "[project]/src/components/game/Ball.tsx",
                lineNumber: 57,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/game/Ball.tsx",
            lineNumber: 47,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: ballStyle,
        className: `${color === 'rainbow-gradient' ? 'rainbow-gradient' : ''}`,
        onClick: handleClick,
        role: "button",
        "aria-label": "Falling ball",
        tabIndex: 0,
        onKeyDown: (e)=>{
            if (e.key === 'Enter' || e.key === ' ') handleClick(e);
        }
    }, void 0, false, {
        fileName: "[project]/src/components/game/Ball.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
};
_c = BallComponent;
const __TURBOPACK__default__export__ = BallComponent;
var _c;
__turbopack_context__.k.register(_c, "BallComponent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/game/ScoreDisplay.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const ScoreDisplay = ({ score, highScore })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute top-4 left-4 bg-primary/80 text-primary-foreground p-3 rounded-lg shadow-md flex flex-col space-y-1 items-start",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-headline font-semibold",
                children: [
                    "Score: ",
                    score
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/game/ScoreDisplay.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-lg font-headline font-medium text-primary-foreground/90",
                children: [
                    "High Score: ",
                    highScore
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/game/ScoreDisplay.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/game/ScoreDisplay.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
};
_c = ScoreDisplay;
const __TURBOPACK__default__export__ = ScoreDisplay;
var _c;
__turbopack_context__.k.register(_c, "ScoreDisplay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/game/LivesDisplay.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>"); // Using Heart as a placeholder for "big ball" icon
;
;
const LivesDisplay = ({ livesState })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute top-4 right-4 flex space-x-2 items-center bg-primary/80 p-3 rounded-lg shadow-md",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-2xl font-headline font-semibold text-primary-foreground mr-2",
                children: "Lives:"
            }, void 0, false, {
                fileName: "[project]/src/components/game/LivesDisplay.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            livesState.map((life)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-inner ${life.exploding ? 'life-lost' : ''}`,
                    "aria-label": "Life",
                    children: !life.exploding && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                        size: 20,
                        className: "text-accent-foreground"
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/LivesDisplay.tsx",
                        lineNumber: 19,
                        columnNumber: 31
                    }, this)
                }, life.id, false, {
                    fileName: "[project]/src/components/game/LivesDisplay.tsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/game/LivesDisplay.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
};
_c = LivesDisplay;
const __TURBOPACK__default__export__ = LivesDisplay;
var _c;
__turbopack_context__.k.register(_c, "LivesDisplay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Button": (()=>Button),
    "buttonVariants": (()=>buttonVariants)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 46,
        columnNumber: 7
    }, this);
});
_c1 = Button;
Button.displayName = "Button";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/card.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Card": (()=>Card),
    "CardContent": (()=>CardContent),
    "CardDescription": (()=>CardDescription),
    "CardFooter": (()=>CardFooter),
    "CardHeader": (()=>CardHeader),
    "CardTitle": (()=>CardTitle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-lg border bg-card text-card-foreground shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 9,
        columnNumber: 3
    }, this));
_c1 = Card;
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 p-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 24,
        columnNumber: 3
    }, this));
_c3 = CardHeader;
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-2xl font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 36,
        columnNumber: 3
    }, this));
_c5 = CardTitle;
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 51,
        columnNumber: 3
    }, this));
_c7 = CardDescription;
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c8 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 63,
        columnNumber: 3
    }, this));
_c9 = CardContent;
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 71,
        columnNumber: 3
    }, this));
_c11 = CardFooter;
CardFooter.displayName = "CardFooter";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "Card$React.forwardRef");
__turbopack_context__.k.register(_c1, "Card");
__turbopack_context__.k.register(_c2, "CardHeader$React.forwardRef");
__turbopack_context__.k.register(_c3, "CardHeader");
__turbopack_context__.k.register(_c4, "CardTitle$React.forwardRef");
__turbopack_context__.k.register(_c5, "CardTitle");
__turbopack_context__.k.register(_c6, "CardDescription$React.forwardRef");
__turbopack_context__.k.register(_c7, "CardDescription");
__turbopack_context__.k.register(_c8, "CardContent$React.forwardRef");
__turbopack_context__.k.register(_c9, "CardContent");
__turbopack_context__.k.register(_c10, "CardFooter$React.forwardRef");
__turbopack_context__.k.register(_c11, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/game/GameOverOverlay.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
;
;
;
const GameOverOverlay = ({ score, highScore, onRestart })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 bg-black/70 flex items-center justify-center z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            className: "w-full max-w-md text-center shadow-2xl bg-background/90",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-4xl font-headline text-primary",
                            children: "Game Over!"
                        }, void 0, false, {
                            fileName: "[project]/src/components/game/GameOverOverlay.tsx",
                            lineNumber: 16,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                            className: "text-lg text-foreground/80",
                            children: "You did great!"
                        }, void 0, false, {
                            fileName: "[project]/src/components/game/GameOverOverlay.tsx",
                            lineNumber: 17,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/game/GameOverOverlay.tsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-2xl font-semibold text-foreground",
                            children: [
                                "Final Score: ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-accent",
                                    children: score
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/GameOverOverlay.tsx",
                                    lineNumber: 22,
                                    columnNumber: 78
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/game/GameOverOverlay.tsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xl font-medium text-foreground/80 mt-2",
                            children: [
                                "High Score: ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-accent/90",
                                    children: highScore
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game/GameOverOverlay.tsx",
                                    lineNumber: 23,
                                    columnNumber: 82
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/game/GameOverOverlay.tsx",
                            lineNumber: 23,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/game/GameOverOverlay.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardFooter"], {
                    className: "flex justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: onRestart,
                        size: "lg",
                        className: "bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-3 px-6",
                        children: "Restart Game"
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/GameOverOverlay.tsx",
                        lineNumber: 26,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/game/GameOverOverlay.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/game/GameOverOverlay.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/game/GameOverOverlay.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
};
_c = GameOverOverlay;
const __TURBOPACK__default__export__ = GameOverOverlay;
var _c;
__turbopack_context__.k.register(_c, "GameOverOverlay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/game/GameScreen.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$Ball$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/game/Ball.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$ScoreDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/game/ScoreDisplay.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$LivesDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/game/LivesDisplay.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$GameOverOverlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/game/GameOverOverlay.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)"); // For a potential start button
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const INITIAL_LIVES = 3;
const BALL_RADIUS = 20;
const BALL_FALL_SPEED = 2; // Pixels per frame (approx)
const BALL_GENERATION_INTERVAL = 1500; // Milliseconds
const MISSED_BALLS_PER_LIFE_LOSS = 5;
const CLICKED_BALLS_PER_LIFE_GAIN = 50;
const EXPLOSION_DURATION = 300; // Milliseconds, should match CSS animation
const HIGH_SCORE_KEY = 'skyfallBoomerHighScore';
const GameScreen = ()=>{
    _s();
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [score, setScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [highScore, setHighScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [livesState, setLivesState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [missedBallStreak, setMissedBallStreak] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [clickedBallStreak, setClickedBallStreak] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [balls, setBalls] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [gameOver, setGameOver] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [gameStarted, setGameStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isBonusAnimating, setIsBonusAnimating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [bonusBallTarget, setBonusBallTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const gameAreaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const livesDisplayRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GameScreen.useEffect": ()=>{
            setIsClient(true);
            initializeLives(INITIAL_LIVES);
            const storedHighScore = localStorage.getItem(HIGH_SCORE_KEY);
            if (storedHighScore) {
                console.log(`Loaded high score from localStorage: ${storedHighScore}`);
                setHighScore(parseInt(storedHighScore, 10));
            } else {
                console.log("No high score found in localStorage. Initializing to 0.");
                setHighScore(0);
            }
        }
    }["GameScreen.useEffect"], []);
    const initializeLives = (numLives)=>{
        setLivesState(Array.from({
            length: numLives
        }, (_, i)=>({
                id: `life-${i}-${Date.now()}`,
                exploding: false
            })));
    };
    const handleBallClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GameScreen.useCallback[handleBallClick]": (ballId)=>{
            if (gameOver) return;
            setBalls({
                "GameScreen.useCallback[handleBallClick]": (prevBalls)=>prevBalls.map({
                        "GameScreen.useCallback[handleBallClick]": (b)=>b.id === ballId ? {
                                ...b,
                                isExploding: true
                            } : b
                    }["GameScreen.useCallback[handleBallClick]"])
            }["GameScreen.useCallback[handleBallClick]"]);
            setTimeout({
                "GameScreen.useCallback[handleBallClick]": ()=>setBalls({
                        "GameScreen.useCallback[handleBallClick]": (prev)=>prev.filter({
                                "GameScreen.useCallback[handleBallClick]": (b)=>b.id !== ballId
                            }["GameScreen.useCallback[handleBallClick]"])
                    }["GameScreen.useCallback[handleBallClick]"])
            }["GameScreen.useCallback[handleBallClick]"], EXPLOSION_DURATION);
            setScore({
                "GameScreen.useCallback[handleBallClick]": (s)=>s + 1
            }["GameScreen.useCallback[handleBallClick]"]);
            setClickedBallStreak({
                "GameScreen.useCallback[handleBallClick]": (cbs)=>{
                    const newStreak = cbs + 1;
                    if (newStreak > 0 && newStreak % CLICKED_BALLS_PER_LIFE_GAIN === 0) {
                        setLivesState({
                            "GameScreen.useCallback[handleBallClick]": (prevLives)=>{
                                if (prevLives.filter({
                                    "GameScreen.useCallback[handleBallClick]": (l)=>!l.exploding
                                }["GameScreen.useCallback[handleBallClick]"]).length >= INITIAL_LIVES * 2) return prevLives;
                                const newLifeId = `life-${prevLives.length}-${Date.now()}`;
                                if (livesDisplayRef.current) {
                                    const livesDisplayRect = livesDisplayRef.current.getBoundingClientRect();
                                    // Calculate target X based on the current number of non-exploding lives
                                    const currentVisibleLives = prevLives.filter({
                                        "GameScreen.useCallback[handleBallClick]": (l)=>!l.exploding
                                    }["GameScreen.useCallback[handleBallClick]"]).length;
                                    const targetX = livesDisplayRect.left + currentVisibleLives * (BALL_RADIUS * 1.2 + 8) + BALL_RADIUS * 0.6;
                                    const targetY = livesDisplayRect.top + BALL_RADIUS * 0.6;
                                    setBonusBallTarget({
                                        x: targetX,
                                        y: targetY
                                    });
                                } else {
                                    // Fallback if ref is not available, though less accurate
                                    setBonusBallTarget({
                                        x: window.innerWidth - 100,
                                        y: 50
                                    });
                                }
                                setIsBonusAnimating(true);
                                setTimeout({
                                    "GameScreen.useCallback[handleBallClick]": ()=>{
                                        setLivesState({
                                            "GameScreen.useCallback[handleBallClick]": (prev)=>[
                                                    ...prev,
                                                    {
                                                        id: newLifeId,
                                                        exploding: false
                                                    }
                                                ]
                                        }["GameScreen.useCallback[handleBallClick]"]);
                                        setIsBonusAnimating(false);
                                        setBonusBallTarget(null); // Reset target after animation
                                    }
                                }["GameScreen.useCallback[handleBallClick]"], 700);
                                return prevLives;
                            }
                        }["GameScreen.useCallback[handleBallClick]"]);
                    }
                    return newStreak;
                }
            }["GameScreen.useCallback[handleBallClick]"]);
        }
    }["GameScreen.useCallback[handleBallClick]"], [
        gameOver
    ]);
    const handleBallMiss = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GameScreen.useCallback[handleBallMiss]": (ballId)=>{
            if (gameOver) return;
            setTimeout({
                "GameScreen.useCallback[handleBallMiss]": ()=>setBalls({
                        "GameScreen.useCallback[handleBallMiss]": (prev)=>prev.filter({
                                "GameScreen.useCallback[handleBallMiss]": (b)=>b.id !== ballId
                            }["GameScreen.useCallback[handleBallMiss]"])
                    }["GameScreen.useCallback[handleBallMiss]"])
            }["GameScreen.useCallback[handleBallMiss]"], EXPLOSION_DURATION);
            setMissedBallStreak({
                "GameScreen.useCallback[handleBallMiss]": (mbs)=>{
                    const newStreak = mbs + 1;
                    if (newStreak > 0 && newStreak % MISSED_BALLS_PER_LIFE_LOSS === 0) {
                        setLivesState({
                            "GameScreen.useCallback[handleBallMiss]": (prevLives)=>{
                                const firstNonExplodingLifeIndex = prevLives.findIndex({
                                    "GameScreen.useCallback[handleBallMiss].firstNonExplodingLifeIndex": (l)=>!l.exploding
                                }["GameScreen.useCallback[handleBallMiss].firstNonExplodingLifeIndex"]);
                                if (firstNonExplodingLifeIndex !== -1) {
                                    const updatedLives = [
                                        ...prevLives
                                    ];
                                    updatedLives[firstNonExplodingLifeIndex] = {
                                        ...updatedLives[firstNonExplodingLifeIndex],
                                        exploding: true
                                    };
                                    const remainingLives = updatedLives.filter({
                                        "GameScreen.useCallback[handleBallMiss]": (l)=>!l.exploding
                                    }["GameScreen.useCallback[handleBallMiss]"]).length;
                                    if (remainingLives === 0) {
                                        console.log(`Game Over. Score: ${score}, Current High Score: ${highScore}`);
                                        if (score > highScore) {
                                            console.log(`New High Score! ${score} > ${highScore}. Saving.`);
                                            setHighScore(score);
                                            localStorage.setItem(HIGH_SCORE_KEY, score.toString());
                                        } else {
                                            console.log(`Score ${score} did not beat high score ${highScore}.`);
                                        }
                                        setGameOver(true);
                                    }
                                    return updatedLives;
                                }
                                return prevLives;
                            }
                        }["GameScreen.useCallback[handleBallMiss]"]);
                    }
                    return newStreak;
                }
            }["GameScreen.useCallback[handleBallMiss]"]);
        }
    }["GameScreen.useCallback[handleBallMiss]"], [
        gameOver,
        score,
        highScore
    ]);
    const getBallColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GameScreen.useCallback[getBallColor]": (currentScore)=>{
            if (currentScore > 500) return 'rainbow-gradient';
            const TIER_SCORE = 30;
            const tier = Math.floor(currentScore / TIER_SCORE);
            const colors = [
                '#FFFFFF',
                '#FFFF00',
                '#90EE90',
                '#ADD8E6',
                '#FFC0CB',
                '#E6E6FA',
                '#FFA500'
            ];
            return colors[tier % colors.length] || '#FFFFFF';
        }
    }["GameScreen.useCallback[getBallColor]"], []);
    const generateBall = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GameScreen.useCallback[generateBall]": ()=>{
            if (!gameAreaRef.current || !isClient) return;
            const gameAreaWidth = gameAreaRef.current.offsetWidth;
            if (gameAreaWidth === 0) return;
            const newBall = {
                id: `ball-${Date.now()}-${Math.random()}`,
                x: Math.random() * (100 - BALL_RADIUS * 2 * 100 / gameAreaWidth) + BALL_RADIUS * 100 / gameAreaWidth,
                y: -BALL_RADIUS,
                radius: BALL_RADIUS,
                color: getBallColor(score),
                onBallClick: handleBallClick,
                isExploding: false
            };
            setBalls({
                "GameScreen.useCallback[generateBall]": (prevBalls)=>[
                        ...prevBalls,
                        newBall
                    ]
            }["GameScreen.useCallback[generateBall]"]);
        }
    }["GameScreen.useCallback[generateBall]"], [
        score,
        getBallColor,
        isClient,
        handleBallClick
    ]); // handleBallClick dependency is now safe
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GameScreen.useEffect": ()=>{
            if (!gameStarted || gameOver || !isClient) return;
            const intervalId = setInterval(generateBall, BALL_GENERATION_INTERVAL);
            return ({
                "GameScreen.useEffect": ()=>clearInterval(intervalId)
            })["GameScreen.useEffect"];
        }
    }["GameScreen.useEffect"], [
        gameStarted,
        gameOver,
        generateBall,
        isClient
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GameScreen.useEffect": ()=>{
            if (!gameStarted || gameOver || !isClient) return;
            let animationFrameId;
            const gameLoop = {
                "GameScreen.useEffect.gameLoop": ()=>{
                    if (!gameAreaRef.current) {
                        animationFrameId = requestAnimationFrame(gameLoop);
                        return;
                    }
                    const gameAreaHeight = gameAreaRef.current.offsetHeight;
                    if (gameAreaHeight <= 0) {
                        animationFrameId = requestAnimationFrame(gameLoop);
                        return;
                    }
                    setBalls({
                        "GameScreen.useEffect.gameLoop": (prevBalls)=>prevBalls.map({
                                "GameScreen.useEffect.gameLoop": (ball)=>{
                                    if (ball.isExploding) return ball;
                                    const newY = ball.y + BALL_FALL_SPEED;
                                    if (newY > gameAreaHeight - ball.radius) {
                                        handleBallMiss(ball.id);
                                        return {
                                            ...ball,
                                            isExploding: true,
                                            y: gameAreaHeight - ball.radius
                                        };
                                    }
                                    return {
                                        ...ball,
                                        y: newY
                                    };
                                }
                            }["GameScreen.useEffect.gameLoop"])
                    }["GameScreen.useEffect.gameLoop"]);
                    animationFrameId = requestAnimationFrame(gameLoop);
                }
            }["GameScreen.useEffect.gameLoop"];
            animationFrameId = requestAnimationFrame(gameLoop);
            return ({
                "GameScreen.useEffect": ()=>cancelAnimationFrame(animationFrameId)
            })["GameScreen.useEffect"];
        }
    }["GameScreen.useEffect"], [
        gameStarted,
        gameOver,
        isClient,
        handleBallMiss
    ]); // handleBallMiss dependency is now safe
    const restartGame = ()=>{
        setScore(0);
        initializeLives(INITIAL_LIVES);
        setMissedBallStreak(0);
        setClickedBallStreak(0);
        setBalls([]);
        setGameOver(false);
        setGameStarted(true);
        const storedHighScore = localStorage.getItem(HIGH_SCORE_KEY);
        if (storedHighScore) {
            const numStoredHighScore = parseInt(storedHighScore, 10);
            console.log(`Restarting game. Loaded high score from localStorage: ${numStoredHighScore}`);
            if (numStoredHighScore !== highScore) {
                setHighScore(numStoredHighScore);
            }
        } else {
            console.log("Restarting game. No high score in localStorage, ensuring it's 0.");
            setHighScore(0); // Ensure high score is 0 if nothing is stored
        }
    };
    const startGame = ()=>{
        const storedHighScore = localStorage.getItem(HIGH_SCORE_KEY);
        if (storedHighScore) {
            const numStoredHighScore = parseInt(storedHighScore, 10);
            console.log(`Starting game. Loaded high score from localStorage: ${numStoredHighScore}`);
            if (numStoredHighScore !== highScore) {
                setHighScore(numStoredHighScore);
            }
        } else if (highScore !== 0) {
            console.log(`Starting game. No stored high score, resetting highScore state from ${highScore} to 0.`);
            setHighScore(0);
        }
        setGameStarted(true);
        // restartGame will be called but let's call initializeLives directly too for clarity on first start
        initializeLives(INITIAL_LIVES);
        setScore(0);
        setMissedBallStreak(0);
        setClickedBallStreak(0);
        setBalls([]);
        setGameOver(false);
    };
    if (!isClient) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-screen bg-background",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-2xl text-primary font-semibold",
                        children: "Loading Game..."
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/GameScreen.tsx",
                        lineNumber: 244,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-foreground/80",
                        children: "Please wait a moment."
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/GameScreen.tsx",
                        lineNumber: 245,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/game/GameScreen.tsx",
                lineNumber: 243,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/game/GameScreen.tsx",
            lineNumber: 242,
            columnNumber: 7
        }, this);
    }
    if (!gameStarted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center h-screen bg-background",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-5xl font-headline text-primary mb-4",
                    children: "Skyfall Boomer"
                }, void 0, false, {
                    fileName: "[project]/src/components/game/GameScreen.tsx",
                    lineNumber: 254,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xl text-foreground/80 mb-8",
                    children: [
                        "High Score: ",
                        highScore
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/game/GameScreen.tsx",
                    lineNumber: 255,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    onClick: startGame,
                    size: "lg",
                    className: "bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-2xl py-4 px-8 shadow-lg hover:shadow-xl transition-shadow",
                    children: "Start Game"
                }, void 0, false, {
                    fileName: "[project]/src/components/game/GameScreen.tsx",
                    lineNumber: 256,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/game/GameScreen.tsx",
            lineNumber: 253,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: gameAreaRef,
        className: "relative w-screen h-screen overflow-hidden bg-background select-none",
        "aria-label": "Game Area",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$ScoreDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                score: score,
                highScore: highScore
            }, void 0, false, {
                fileName: "[project]/src/components/game/GameScreen.tsx",
                lineNumber: 265,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: livesDisplayRef,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$LivesDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    livesState: livesState
                }, void 0, false, {
                    fileName: "[project]/src/components/game/GameScreen.tsx",
                    lineNumber: 267,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/game/GameScreen.tsx",
                lineNumber: 266,
                columnNumber: 7
            }, this),
            balls.map((ball)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$Ball$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    ...ball,
                    onBallClick: handleBallClick
                }, ball.id, false, {
                    fileName: "[project]/src/components/game/GameScreen.tsx",
                    lineNumber: 271,
                    columnNumber: 9
                }, this)),
            isBonusAnimating && bonusBallTarget && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed rounded-full bg-accent z-[100]",
                style: {
                    width: `${BALL_RADIUS * 2}px`,
                    height: `${BALL_RADIUS * 2}px`,
                    left: '50vw',
                    top: '50vh',
                    // transform: 'translate(-50%, -50%)', // Initial position center for animation start
                    animationName: 'big-ball-bonus-animation',
                    animationDuration: '0.7s',
                    animationTimingFunction: 'ease-out',
                    animationFillMode: 'forwards',
                    '--target-x': `${bonusBallTarget.x}px`,
                    '--target-y': `${bonusBallTarget.y}px`
                }
            }, void 0, false, {
                fileName: "[project]/src/components/game/GameScreen.tsx",
                lineNumber: 275,
                columnNumber: 9
            }, this),
            gameOver && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$GameOverOverlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                score: score,
                highScore: highScore,
                onRestart: restartGame
            }, void 0, false, {
                fileName: "[project]/src/components/game/GameScreen.tsx",
                lineNumber: 293,
                columnNumber: 20
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/game/GameScreen.tsx",
        lineNumber: 264,
        columnNumber: 5
    }, this);
};
_s(GameScreen, "NBht+k7pjxvcLaSaY+ZMpSvAlVI=");
_c = GameScreen;
const __TURBOPACK__default__export__ = GameScreen;
var _c;
__turbopack_context__.k.register(_c, "GameScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": (()=>__iconNode),
    "default": (()=>Heart)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
            key: "c3ymky"
        }
    ]
];
const Heart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Heart", __iconNode);
;
 //# sourceMappingURL=heart.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Heart": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_b1058ac9._.js.map