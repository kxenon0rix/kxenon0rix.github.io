---
layout: article
slug: "markdown-test"
title: "Complete Markdown Syntax Test"
date: 2025-08-21T09:00:00+08:00
description: "A showcase of Markdown, math, Mermaid diagrams, and Hugo shortcodes."
categories: [technology]
photo: photo-book
image: https://images.unsplash.com/photo-1455390582262-044c623f8e5d?auto=format&fit=crop&w=1600&q=88
math: true
mermaid: true
---

# Heading level 1
## Heading level 2
### Heading level 3
#### Heading level 4
##### Heading level 5
###### Heading level 6

---

## 1. Text formatting

Regular text

**Bold text**

*Italic text*

***Bold italic text***

~~Strikethrough~~

<u>Underline</u>

==Highlighted text==

`Inline code`

H~2~O

X^2^

Superscript: <sup>2</sup>

Subscript: <sub>2</sub>

Keyboard shortcut: <kbd>Ctrl</kbd> + <kbd>C</kbd>

---

## 2. Blockquotes

> A regular quote

> First-level quote
>> Second-level quote
>>> Third-level quote

---

## 3. Lists

- Unordered item
- Second item
  - Nested item A
  - Nested item B

1. Ordered item
2. Step two
3. Step three

### Task list

- [x] Completed
- [x] Reviewed
- [ ] To do
- [ ] To publish

---

## 4. Links

[OpenAI](https://openai.com)

<https://example.com>

[Link with a title](https://example.com "Link title")

---

## 5. Images

![Landscape photograph](https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80)

[![Clickable landscape photograph](https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=500&q=75)](https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=90)

---

## 6. Tables

| Name | Type | Status |
|:---|:---:|---:|
| Markdown | Document | Ready |
| Mermaid | Diagram | Ready |
| Hugo | Site generator | Ready |

---

## 7. Code blocks

```python
def hello(name):
    return f"Hello, {name}!"

print(hello("World"))
```

```javascript
const user = {
  name: "Alice",
  age: 20,
  active: true
};

console.log(user);
```

```json
{
  "name": "Markdown",
  "version": "1.0",
  "enabled": true
}
```

```diff
- const oldValue = 10;
+ const newValue = 20;
```

---

## 8. Math

Inline formula: $E = mc^2$

Display formula:

$$
E = mc^2
$$

Integral:

$$
\int_{-\infty}^{+\infty} e^{-x^2} dx = \sqrt{\pi}
$$

Matrix:

$$
A =
\begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{bmatrix}
$$

---

## 9. Mermaid flowchart

```mermaid
flowchart TD
    A[Start] --> B{Condition}
    B -->|Yes| C[Run action A]
    B -->|No| D[Run action B]
    C --> E[End]
    D --> E
```

---

## 10. Mermaid sequence diagram

```mermaid
sequenceDiagram
    participant U as Visitor
    participant A as Frontend
    participant S as Server
    U->>A: Send request
    A->>S: API call
    S-->>A: Return data
    A-->>U: Show result
```

---

## 11. Mermaid Gantt chart

```mermaid
gantt
    title Project plan
    dateFormat YYYY-MM-DD
    section Design
    Interface design :a1, 2026-01-01, 5d
    section Development
    Frontend :a2, after a1, 10d
    Backend :a3, after a1, 12d
    section Testing
    System test :a4, after a3, 5d
```

---

## 12. Mermaid mind map

```mermaid
mindmap
  root((Markdown))
    Core syntax
      Headings
      Lists
      Quotes
    Extensions
      Tables
      Math
      Diagrams
    Advanced features
      Shortcodes
      Interactive components
      Dynamic content
```

---

## 13. GitHub-style callouts

> [!NOTE]
> This is a note.

> [!TIP]
> This is a useful tip.

> [!IMPORTANT]
> This is important.

> [!WARNING]
> This is a warning.

> [!CAUTION]
> Use care when performing this action.

---

## 14. HTML disclosure

<details>
<summary>Click to expand</summary>

This content is hidden until expanded. You can put text, code, and other elements here.

</details>

---

## 15. Footnotes

Here is a sentence with a footnote.[^1]

[^1]: This is the footnote.

---

## 16. Definition lists

Markdown
: A lightweight markup language.

Hugo shortcodes
: Reusable components embedded in Markdown content.

---

## 17. Symbols

Arrows: ← ↑ → ↓ · — …

Mathematical symbols: ∑ ∫ √ ∞ ≈ ≠ ≤ ≥

---

## 18. Mixed HTML layout

<div align="center">

### Centered heading

This paragraph is centered.

</div>

<mark>Highlighted text</mark>

<small>Small text</small>

<del>Deleted text</del>

<ins>Inserted text</ins>

---

## 19. Table of contents anchors

[Jump to text formatting](#1-text-formatting)

[Jump to code blocks](#7-code-blocks)

---

## 20. Hugo card shortcode

{{< card title="Feature card" icon="→" >}}
This is the body of the card.
{{< /card >}}

---

## 21. Hugo tabs shortcode

{{< tabs >}}
{{< tab title="Python" >}}
```python
print("Hello")
```
{{< /tab >}}
{{< tab title="JavaScript" >}}
```javascript
console.log("Hello");
```
{{< /tab >}}
{{< /tabs >}}

---

## 22. Hugo buttons

{{< button variant="primary" >}}Primary action{{< /button >}}

{{< button variant="secondary" >}}Secondary action{{< /button >}}

---

## 23. Hugo progress bar

{{< progress value="75" max="100" >}}

---

## 24. Hugo badges

{{< badge color="green" >}}Success{{< /badge >}}

{{< badge color="yellow" >}}In progress{{< /badge >}}

{{< badge color="red" >}}Failed{{< /badge >}}

---

## 25. Hugo alerts

{{< alert type="success" >}}The operation succeeded.{{< /alert >}}

{{< alert type="warning" >}}Please check the input.{{< /alert >}}

{{< alert type="error" >}}An error occurred.{{< /alert >}}

---

## 26. Hugo grid

{{< grid columns="3" >}}
{{< card title="Card A" >}}Content A{{< /card >}}
{{< card title="Card B" >}}Content B{{< /card >}}
{{< card title="Card C" >}}Content C{{< /card >}}
{{< /grid >}}

---

## 27. Chart shortcode

{{< bar-chart >}}

---

## 28. Interactive form shortcode

{{< demo-form >}}

---

## 29. Horizontal rules

---

***

___

---

## 30. Combined example

# A modern Markdown showcase

> [!IMPORTANT]
> This combines several features in one example.

### Feature checklist

- [x] Basic formatting
- [x] Syntax highlighting
- [x] Mathematical formulas
- [x] Diagrams
- [ ] Interactive content

### Sample metrics

| Metric | Value | Trend |
|---|---:|---|
| Readers | 12,500 | Rising |
| Visits | 88,000 | Rising |
| Error rate | 0.2% | Falling |

### Flow

```mermaid
flowchart LR
    A[Markdown] --> B[Parse]
    B --> C[Render]
    C --> D[Readable page]
```

### Formula

$$
f(x)=\frac{1}{1+e^{-x}}
$$

**Done!**
