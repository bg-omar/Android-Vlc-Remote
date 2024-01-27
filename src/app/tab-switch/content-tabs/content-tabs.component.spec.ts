import {ContentTabsComponent, ContentTabsConfiguration} from './content-tabs.component';

describe('BgContentTabsComponent', (): void => {
    let component: ContentTabsComponent;
    const mockTabConfiguration: ContentTabsConfiguration[] = [
        {
            text: 'Tab 1',
            selected: false,
            value: 'Value 1'
        },
        {
            text: 'Tab 2',
            selected: false,
            value: 'Value 2'
        }
    ];

    beforeEach((): void => {
        component = new ContentTabsComponent();
        component.tabsConfiguration = mockTabConfiguration;
    });

    it('should emit the value after being toggled', (): void => {
        component.selectTab(component.tabsConfiguration[0]);
        expect(component.tabsConfiguration[0].selected).toBe(true);

        component.selectTab(component.tabsConfiguration[1]);
        expect(component.tabsConfiguration[0].selected).toBe(false);
        expect(component.tabsConfiguration[1].selected).toBe(true);
    });

    it('should emit the value after being toggled', (): void => {
        spyOn(component.tabClicked, 'emit');
        component.selectTab(mockTabConfiguration[0]);
        expect(component.tabClicked.emit).toHaveBeenCalledWith(component.tabsConfiguration[0]);
    });
});
