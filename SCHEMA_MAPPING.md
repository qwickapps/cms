# Schema Mapping: CMS Blocks → Framework Components

This document defines the mapping between Payload CMS block fields and QwickApps Framework component schemas.

## Framework Schema Hierarchy

```
Model (base)
└── ViewSchema (adds all styling/layout props)
    └── ContainerSchema (adds children prop)
        ├── SectionModel
        ├── HeroBlockModel
        └── GridLayoutModel
```

## ViewSchema - Base Props for ALL Components

ViewSchema provides comprehensive styling props inherited by all components:

### Layout Props
- `span`: Grid column span (number | 'auto' | 'grow')
- `xs`, `sm`, `md`, `lg`, `xl`: Responsive breakpoint spans

### Dimension Props
- `width`, `height`: Component dimensions (t-shirt sizes, CSS values, numbers)
- `minWidth`, `minHeight`: Minimum dimension constraints
- `maxWidth`, `maxHeight`: Maximum dimension constraints

### Spacing Props (T-Shirt Sizing: 'none' | 'tiny' | 'small' | 'medium' | 'large' | 'huge')
- `padding`, `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft`, `paddingX`, `paddingY`
- `margin`, `marginTop`, `marginRight`, `marginBottom`, `marginLeft`, `marginX`, `marginY`

### Background Props
- `background`: **Canonical** - CSS color, theme path (e.g., 'primary.main'), or gradient
- `backgroundColor`: **Deprecated** - use `background` instead
- `backgroundImage`: Background image URL
- `backgroundGradient`: CSS gradient string

### Text Props
- `textAlign`: 'left' | 'center' | 'right' | 'justify'

### Advanced Styling
- `className`: Additional CSS class names
- `sx`: MUI sx prop as JSON (Material-UI styling)
- `style`: Inline CSS styles as JSON

### Accessibility
- `id`: HTML element ID
- `role`: ARIA role
- `aria-label`, `aria-labelledby`, `aria-describedby`
- `data-testid`: Test automation ID

## Block-Specific Schemas

### HeroBlock → HeroBlockModel

Inherits: ViewSchema → ContainerSchema

**Specific Props:**
- `title` (string, required): Main headline
- `subtitle` (string): Subtitle/description
- `backgroundImage` (URL): Background image
- `backgroundGradient` (string): CSS gradient
- `backgroundColor` ('default' | 'primary' | 'secondary' | 'surface'): Theme variant
- `actions` (ActionModel[]): Array of button actions
  - `label` (string): Button text
  - `href` (string): Link URL
  - `variant` ('contained' | 'outlined' | 'text'): Button style
  - `size` ('small' | 'medium' | 'large'): Button size
- `textAlign` ('left' | 'center' | 'right'): Text alignment
- `blockHeight` ('small' | 'medium' | 'large' | 'viewport'): Preset heights
- `overlayOpacity` (number 0-1): Overlay opacity for background images
- `className` (string): Additional CSS class

### TextSection → SectionModel

Inherits: ViewSchema → ContainerSchema

**Specific Props:**
- `background` (string): Background color (CSS, theme path, palette color)
- `color` (string): Text color (CSS, theme path, palette color)
- `padding` ('none' | 'tiny' | 'small' | 'medium' | 'large' | 'extra-large'): Section padding
- `contentMaxWidth` ('xs' | 'sm' | 'md' | 'lg' | 'xl' | 'false'): Max content width
- `component` ('section' | 'div' | 'article' | 'main'): HTML element type
- `children` (ReactNode): Content to render

### FeatureGrid → GridLayoutModel + Section

Combines GridLayout for layout and Section for wrapper.

**GridLayout Props:**
- `columns` (number): Number of equal-width columns
- `spacing` ('tiny' | 'small' | 'medium' | 'large' | 'huge'): Spacing between items
- `equalHeight` (boolean): Make all items same height
- `height`, `width`, `minHeight`, `minWidth`, `maxHeight`, `maxWidth`: Dimension constraints

**Section Wrapper Props:**
- All SectionModel props above

## CMS Block → Framework Component Mapping

| CMS Block Type | Framework Component | Props to Pass Through |
|----------------|--------------------|-----------------------|
| `hero` | `HeroBlock` | title, subtitle, backgroundImage, backgroundGradient, textAlign, blockHeight (as height), actions, + all ViewSchema props |
| `textSection` | `Section` | background, color (not textColor!), padding, maxWidth (as contentMaxWidth), textAlign, + all ViewSchema props |
| `featureGrid` | `Section` > `GridLayout` | Section: padding, background; Grid: columns, spacing, equalHeight, + all ViewSchema props |
| `ctaSection` | `Section` | background, padding, textAlign, + all ViewSchema props |
| `productGrid` | `Section` > `GridLayout` | Section: padding, background; Grid: columns, spacing, + all ViewSchema props |

## Important Notes

### Color/Background Prop Names
- ✅ **USE**: `background` (canonical in ViewSchema and SectionSchema)
- ✅ **USE**: `color` for text color (SectionSchema)
- ❌ **DON'T USE**: `backgroundColor` (deprecated, use `background`)
- ❌ **DON'T USE**: `textColor` (doesn't exist, use `color`)

### Padding Values
- CMS blocks use: 'none' | 'small' | 'medium' | 'large'
- SectionModel uses: 'none' | 'tiny' | 'small' | 'medium' | 'large' | 'extra-large'
- **Action**: Update CMS to match framework options

### MaxWidth Values
- CMS blocks use: 'sm' | 'md' | 'lg' | 'xl' | 'full'
- SectionModel uses: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'false'
- **Action**: Update CMS field name to `contentMaxWidth` and add 'xs' option, change 'full' to 'false'

### Background Theme Variants
- HeroBlockModel supports: 'default' | 'primary' | 'secondary' | 'surface'
- Other blocks use string values for custom colors/gradients
- **Action**: Provide both options - preset themes AND custom color field

## BlockRenderer Update Requirements

The BlockRenderer must:
1. Extract ALL ViewSchema props from block data
2. Pass them through to framework components
3. Handle prop name transformations:
   - `maxWidth` → `contentMaxWidth` (for Section)
   - `blockHeight` → `height` (for HeroBlock)
4. Preserve all styling props (className, sx, style)
5. Support background as both preset and custom values

## Admin UI Improvements

### Required Field Components:
1. **ColorPicker**: For `background`, `color` fields with:
   - Theme color picker (primary.main, secondary.main, etc.)
   - Custom color picker (hex, rgb)
   - Recent colors
2. **IconPicker**: For icon selection with:
   - Material Icons search
   - Emoji picker
   - Custom icon upload
3. **SpacingPicker**: Visual t-shirt size selector
4. **DimensionPicker**: Preset + custom value input

### Field Organization:
- Group related fields in collapsible sections:
  - "Content" (title, subtitle, content)
  - "Layout & Spacing" (padding, margin, width, height)
  - "Background & Colors" (background, color, backgroundImage)
  - "Typography" (textAlign, font properties)
  - "Advanced" (className, sx, accessibility)

## Implementation Checklist

- [ ] Create custom Payload field components (ColorPicker, etc.)
- [ ] Update ContentBlocks.ts to match framework schemas
- [ ] Remove incorrect field names (textColor → color, backgroundColor → background)
- [ ] Add missing props from ViewSchema
- [ ] Update BlockRenderer to pass all props through
- [ ] Test each block type end-to-end
- [ ] Document any framework gaps that need addressing
- [ ] Create admin UI examples/documentation

---

**Last Updated**: 2025-01-09
**Framework Version**: @qwickapps/react-framework@0.1.0
**CMS Version**: @qwickapps/cms@0.1.0
