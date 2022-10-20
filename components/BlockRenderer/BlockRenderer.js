import { CallToActionButton } from "components/CallToActionButton"
import { Columns } from "components/Columns"
import { Column } from "components/Column"
import { Cover } from "components/Cover"
import { Heading } from 'components/Heading'
import { Paragraph } from "components/Paragraph"
import { theme } from "theme"
import Image from "next/image"
import { PostTitle } from "components/PostTitle"
import { PropertySearch } from "components/PropertySearch"
import { FormspreeForm } from "components/FormspreeForm"
import { PropertyFeatures } from "components/PropertyFeatures"
import { Gallery } from "components/Gallery"
import { TickItem } from "components/TickItem"

export const BlockRenderer = ({blocks}) => {
    return blocks.map(block => {
        switch(block.name) {
            case 'core/heading': {
                return (
                    <Heading 
                        key={block.id}
                        level={block.attributes.level}
                        content={block.attributes.content}
                        textAlign={block.attributes.textAlign} 
                    />
                )
            }

            case 'core/paragraph': {
                return (
                    <Paragraph 
                        key={block.id} 
                        content={block.attributes.content}
                        textAlign={block.attributes.align}
                        textColor={theme[block.attributes.textColor] || block.attributes.style?.color?.text}
                    />
                )
            }

            case "core/post-title": {
                return (
                    <PostTitle
                        key={block.id} 
                        level={block.attributes.level}
                        textAlign={block.attributes.textAlign}
                    />
                )
            }
            case 'core/cover': {
                console.log("COVER BLOCK: ", block)
                return (
                    <Cover key={block.id} background={block.attributes.url}>
                        <BlockRenderer blocks={block.innerBlocks} />
                    </Cover>
                )
            }

            case 'acf/ctabutton': {
                console.log("CTA: ", block)
                return (
                    <CallToActionButton
                        buttonLabel={block.attributes.data.label}
                        destination={block.attributes.data.destination || ""}
                        align={block.attributes.data.align}
                        key={block.id}
                    />
                )
            }

            case "core/columns": {
                console.log("COLUMNS: ", block.attributes)
                return (
                    <Columns
                        key={block.id}
                        isStackedOnMobile={block.attributes.isStackedOnMobile}
                        textColor={theme[block.attributes.textColor] || block.attributes.style?.color?.text}
                        backgroundColor={theme[block.attributes.backgroundColor] || block.attributes.style?.color?.background}
                    >
                        <BlockRenderer blocks={block.innerBlocks} />
                    </Columns>
                )
            }

            case "core/column": {
                return (
                    <Column
                        key={block.id}
                        width={block.attributes.width}
                        textColor={theme[block.attributes.textColor] || block.attributes.style?.color?.text}
                        backgroundColor={theme[block.attributes.backgroundColor] || block.attributes.style?.color?.background}
                    >
                        <BlockRenderer blocks={block.innerBlocks} />
                    </Column>
                )
            }

            case "core/image": {
                return (
                    <Image 
                        key={block.id}
                        src={block.attributes.url}
                        height={block.attributes.originalHeight}
                        width={block.attributes.originalWidth}
                        alt={block.attributes.alt || ""}
                    />
                )
            }

            case "core/gallery": {
                return (
                    <Gallery
                        key={block.id} 
                        columns={block.attributes.columns || 3}
                        cropImages={block.attributes.imageCrop}
                        items={block.innerBlocks}
                    />
                )
            }

            case "core/block":
            case "core/group": {
                return (
                    <BlockRenderer key={block.id} blocks={block.innerBlocks} />
                )
            }

            case "acf/propertysearch": {
                return (
                    <PropertySearch key={block.id} form />
                )
            }

            case "acf/formspreeform": {
                return (
                    <FormspreeForm
                        key={block.id} 
                        formId={block.attributes.data.form_id}
                    />
                )
            }

            case "acf/propertyfeatures": {
                return (
                    <PropertyFeatures key={block.id} />
                )
            }

            case "acf/tickitem": {
                return (
                    <TickItem key={block.id}>
                        <BlockRenderer blocks={block.innerBlocks} />
                    </TickItem>
                )
            }

            default:
                console.log("UNKNOWN: ", block)
                return null
        }
    })
}