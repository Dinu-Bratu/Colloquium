# The Colloquium

*A republic of letters, reflection, and inquiry.*

The Colloquium is a statically published website dedicated to editorials, long-form essays, poetry, satire, history, philosophy, software engineering, and systems thinking.

The project is intentionally lightweight, framework-free, and designed for long-term maintainability. This repository contains the complete source for the public-facing site.

---

## At a Glance

| Item            | Value                                                                                                      |
| --------------- | ---------------------------------------------------------------------------------------------------------- |
| Repository Type | Static Website                                                                                             |
| Hosting         | Porkbun                                                                                                    |
| Deployment      | GitHub → main → Public Site                                                                                |
| Languages       | HTML, CSS, JavaScript                                                                                      |
| Content         | Editorials, Long-Form Essays, Poetry, Sonnets, Satirical Comics, Visual Narratives, and Reference Material |
| Build System    | None                                                                                                       |
| Package Manager | None                                                                                                       |
| Frameworks      | None                                                                                                       |
| CMS             | None                                                                                                       |

---

## Publishing Model and Workflow

The Colloquium is intentionally implemented as a lightweight static website.

The site is composed primarily of:

* Hand-authored HTML
* CSS
* JavaScript
* Original writing
* Companion imagery, including selected AI-generated artwork
* Canonical PDF editions

The project deliberately avoids heavyweight frameworks, build systems, package managers, and runtime dependencies. Simplicity is a design goal rather than a limitation.

### Hosting

The public site is statically hosted through Porkbun and integrated with GitHub for publication.

Changes are developed and reviewed within GitHub before being merged into the main branch. Updates become visible on the public-facing site only after approved changes are merged into `main`.

### Repository Status

At present, the repository is public but editorially controlled.

Visitors are welcome to browse the source code, site structure, and published content. Direct modification rights, however, remain restricted.

The repository should presently be viewed as:

* Publicly visible
* Read-only for external contributors
* Maintained by the site's editor

### Development Workflow

The current workflow follows a traditional feature-branch model:

1. Create a feature branch.
2. Develop and refine content, styling, imagery, or site structure.
3. Validate changes locally.
4. Submit a pull request.
5. Review and approve changes.
6. Merge approved changes into `main`.
7. Publish updated content to the public site.

This process preserves a clear separation between experimentation and publication while maintaining a stable public-facing edition of the site.

### Future Collaboration

The current editorial model reflects the site's early stage of development.

Over time, trusted collaborators may be invited to participate through forks, pull requests, editorial review, or other contribution models.

Any future collaboration process will prioritize quality, consistency, provenance, and long-term maintainability over publication volume.

---

## Repository Structure

The repository is organized around content rather than technology.

### Chambers

Chambers represent domains of inquiry.

Current chambers include:

* Civic Discussions
* Engineered Systems
* History
* Philosophy
* Satire
* Software Instruments

### Content Collections

Content is also organized by form.

Current collections and content areas include:

* Opinion
* Poetry
* Long-Form
* Satire

In short:

* Chambers describe what is being explored.
* Collections describe how it is being expressed.

### High-Level Structure

```text
about/              Site information
contact/            Contact information

assets/             Supporting images and media assets
images/             Shared site imagery
styles/             CSS
js/                 JavaScript
pdf/                Canonical PDF editions
tools/              Utility scripts supporting provenance, hashing, and publication workflows

chambers/           Domains of inquiry
    civic-discussions/
    engineered-systems/
    history/
    philosophy/
    satire/
    software-instruments/

opinion/            Editorials and opinion pieces
poetry/             Poetry and sonnets
long-form/          Long-form essays and papers
satire/             Comics, visual satire, and related works

manuscripts/        Draft and source material
notes/              Working notes and reference material
```

Published content represents only part of the project.

The repository also contains working notes, drafts, supporting materials, and editorial artifacts used during the development of essays, editorials, poetry, visual narratives, and other works.

---

## Design Principles

Several principles guide the site's development:

* Simplicity over complexity
* Readability over novelty
* Static publishing over dynamic frameworks
* Human authorship over algorithmic optimization
* Long-term maintainability over short-term convenience

The site's visual design intentionally favors typography, whitespace, careful use of imagery, and restrained presentation.

---

## Motivation

The Colloquium was created to provide a permanent home for essays, editorials, poetry, long-form articles, satire, and other works that do not fit comfortably within traditional blogging platforms or social media.

Rather than pursuing novelty, immediacy, or engagement metrics, the project emphasizes permanence, revision, intellectual curiosity, and the preservation of ideas.

The site draws inspiration from the historical republic of letters, scholarly journals, private correspondence, public discourse, and the long tradition of reflective writing.

---

## Evolution of the Project

The site did not emerge fully formed.

Its structure evolved gradually through experimentation with:

* editorial organization
* visual identity
* typography
* information architecture
* long-form writing
* poetry and sonnets
* provenance tracking
* static-site publishing

Over time, recurring themes emerged, eventually becoming the foundation for the site's chambers and collections.

---

## Easter Eggs and Hidden Layers

The Colloquium contains a small number of intentional Easter Eggs.

These hidden elements are not required to navigate the site, but reward curiosity and exploration.

A recurring phrase appears throughout the project:

*In Aperto Latet*

("Hidden in plain sight")

This idea serves as a recurring motif throughout the site and reflects the belief that deeper layers of meaning often exist beneath the visible surface.

---

## Provenance

Published works may include provenance identifiers, version information, and canonical PDF editions.

These mechanisms help establish authorship, version history, publication integrity, cache validity, and long-term traceability.

### Cache-Busting Hashes

For CSS files, JavaScript files, and selected generated image assets, cache-busting identifiers are derived directly from file contents.

A SHA-512 hash is generated for the file, and the first eight characters of that hash are used as the cache-busting query string value.

For example:

```html
<link rel="stylesheet" href="/styles/main.css?v=6CD80E3D">
<script src="/js/easter-egg.js?v=9A17C2E4" defer></script>
<img src="/images/colloquium-social-card.png?v=4A89B9AB" alt="">
```

This allows the site to retain long-lived static assets while forcing clients to retrieve updated versions when file contents change.

### Editorial Provenance Tokens

For opinion pieces, long-form articles, poetry, and other authored works, provenance tokens are generated differently.

These tokens are based on a unique secret value supplied by the author rather than directly on the public file contents.

The resulting token is not intended to function as a cryptographic proof published in full. Instead, it acts as a compact public identifier associated with a particular authored work, version, or canonical edition.

Using these tokens, an author may later demonstrate provenance by publicly revealing the secret key phrase used to generate the identifier. Independent parties can then reproduce the token and verify that it matches the value associated with the published work.

Until the secret phrase is disclosed, the token functions as a compact public commitment. Once disclosed, it becomes evidence linking a specific author, phrase, or provenance record to a particular edition of the work.

### Utility Script

The general utility pattern uses the PowerShell script [`tools/gethash.ps1`](tools/gethash.ps1), which accepts either a file path or an arbitrary string value. The script is used throughout the project to generate compact SHA-512-derived identifiers for cache-busting and provenance workflows.

If the supplied value is a file, the token is generated from the file contents. Otherwise, the token is generated from the UTF-8 encoded string.

```powershell
param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$Value
)

if (Test-Path -LiteralPath $Value -PathType Leaf)
{
    (Get-FileHash -LiteralPath $Value -Algorithm SHA512).Hash.Substring(0,8)
}
else
{
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($Value)
    $sha512 = [System.Security.Cryptography.SHA512]::Create()
    $hashBytes = $sha512.ComputeHash($bytes)
    $hash = [BitConverter]::ToString($hashBytes).Replace("-", "")

    $hash.Substring(0,8)
}
```

This same mechanism supports both practical cache-busting and editorial provenance workflows, while keeping the public-facing identifiers short and readable.

---

## What's Next?

The project continues to evolve.

Areas currently under development include:

* Additional editorials
* Satirical cartoons and companion essays
* Long-form historical analyses
* Sonnets and companion artwork
* Scansion guides and poetic analysis
* Expanded chamber content
* Additional collections and reference material
* Future visual refinements
* Adding support for reusable templates and content-generation workflows

The Colloquium is intended to remain a living project rather than a finished one.
