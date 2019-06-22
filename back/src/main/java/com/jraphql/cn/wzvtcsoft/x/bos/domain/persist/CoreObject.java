package com.jraphql.cn.wzvtcsoft.x.bos.domain.persist;


import com.jraphql.cn.wzvtcsoft.x.bos.domain.GQLEntity;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@MappedSuperclass
@Access(AccessType.FIELD)
public class CoreObject implements GQLEntity, Serializable {
    private UUID id;

    @Id
    @GeneratedValue(generator = "bosidgenerator")
    @GenericGenerator(name = "bosidgenerator", strategy = "cn.wzvtcsoft.x.bos.domain.persist.BosidGenerator")
    @Column(name = "id", nullable = false, length = 25)
    @Access(AccessType.PROPERTY)
    public UUID getId() {
        return this.id;
    }

    @Override
    public final boolean equals(Object obj) {
        if (this.id == null || obj == null || !(obj instanceof GQLEntity)) {
            return false;
        } else {
            return Objects.equals(this.id, ((GQLEntity) obj).getId());
        }
    }

    @Override
    public final int hashCode() {
        return (this.id == null) ? 13 : Objects.hash(this.id);
    }


}
