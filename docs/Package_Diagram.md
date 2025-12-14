# Package Diagram

This document illustrates the structure of the **BINUS Event Finder** application using a UML Package Diagram.

## 1. ASCII Representation

```mermaid
classDiagram
    class PresentationLayer {
        index.html
        competition.html
        community-service.html
        sat-point.html
    }
    class LogicLayer {
        script.js
    }
    class StyleLayer {
        style.css
        competition-styles.css
    }
    class Resources {
        assets/*
    }
    class Documentation {
        docs/*
    }

    PresentationLayer ..> LogicLayer : uses (script tag)
    PresentationLayer ..> StyleLayer : uses (link tag)
    PresentationLayer ..> Resources : includes (img tag)
    LogicLayer ..> PresentationLayer : manipulates (DOM)
```

## 2. PlantUML Diagram

```plantuml
@startuml
skinparam packageStyle rectangle

package "BINUS Event Finder System" {
    
    package "Presentation Layer (Web Pages)" as View {
        file "index.html"
        file "competition.html"
        file "community-service.html"
        file "sat-point.html"
    }

    package "Logic Layer (Controller)" as Controller {
        file "script.js" 
    }

    package "Style Layer (UI Design)" as Style {
        file "style.css"
        file "competition-styles.css"
    }

    package "Resources (Assets)" as Assets {
        folder "assets" {
            [Images/Icons]
        }
    }

    package "Documentation" as Docs {
        file "Activity_Diagram.md"
        file "Use_Case_Diagram.md"
        file "IPO_Table.md"
    }
}

' Relationships
View ..> Controller : imports <script>
View ..> Style : imports <link>
View ..> Assets : displays <img>

Controller ..> View : DOM Manipulation
@enduml
```

## 3. Package Descriptions

| Package | Component | Description |
| :--- | :--- | :--- |
| **Presentation Layer** | HTML Files | Contains the structural markup for the web pages (`index`, `competition`, `community-service`, `sat-point`). Acts as the **View** in the MVC-like structure. |
| **Logic Layer** | `script.js` | Contains the client-side logic for event handling, data filtering, and DOM updates. Acts as the **Controller**. |
| **Style Layer** | CSS Files | Contains the visual styling rules (`style.css`). `competition-styles.css` appears to be a supplementary or draft style sheet. |
| **Resources** | `assets/` | Stores static assets such as identifying logos, favicons, and other graphics. |
| **Documentation** | `docs/` | Contains project documentation including diagrams and specifications. |
