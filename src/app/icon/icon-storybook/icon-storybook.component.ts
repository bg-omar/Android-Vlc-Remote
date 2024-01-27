import {Component, Input} from '@angular/core';

export interface IconSet {
    title: string;
    icons: string[];
    type: string;
}

@Component({
    selector: 'bg-icon-storybook',
    templateUrl: './icon-storybook.component.html',
    styleUrls: ['./icon-storybook.component.scss']
})
export class IconStorybookComponent {
    @Input() iconSets: IconSet[];
    @Input() iconType: string;
    @Input() iconColor: string;
    @Input() iconSize: string;

    copyIconTag(event): void {
        const containerElement: HTMLElement = event.path.find((element: HTMLElement) => element.className === 'icon-display-container');
        const copyTagElement: HTMLTextAreaElement = containerElement.querySelector('.copy-tag');
        copyTagElement.select();
        document.execCommand('copy');

        this.showIconCopiedIndication(containerElement);
    };

    showIconCopiedIndication(containerElement: HTMLElement): void {
        const iconContainer: HTMLElement = containerElement.querySelector('.tag-copied');
        iconContainer.classList.add('show');
        iconContainer.innerText = 'Copied to clipboard!';

        setTimeout(() => {
            iconContainer.classList.remove('show');
            iconContainer.innerText = 'Copy to clipboard';
        }, 2000);
    };
}
