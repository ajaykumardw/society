import PermissionGuard from '@/hocs/PermissionGuard';
import ApartmentType from '@views/apps/settings/apartment-type-setting/index';

export default async function TowerApp({ params }) {

    const { lang } = await params;

    return (
        <PermissionGuard locale={lang} element="isCompany">
            <ApartmentType />
        </PermissionGuard>
    );
}
